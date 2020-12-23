import { Injectable } from '@angular/core';
import { makeVar, ReactiveVar } from '@apollo/client/core';
import { map, pluck, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cookie } from 'src/app/graphql/model/cookie.model';
import { CookiesCacheGQL, CookiesCacheResponse } from '../query/cookies-cache.gql';
import { CookiesGQL, CookiesResponse } from '../query/cookies.gql';
import { ApolloQueryResult } from '@apollo/client/core';
import { CookiesPaginationVarGQL } from '../query/cookies-pagination-var.gql';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AddCookieGQL } from '../mutation/add-cookie.gql';
import { DeleteCookieGQL } from '../mutation/delete-cookie.gql';
import { UpdateCookieGQL } from '../mutation/update-cookie.gql';

export interface ICookiesPaginationVar {
  collection: Cookie[];
  page: number;
  total: number;
}

export interface ICookiesPaginationAction {
  next: boolean;
  previous: boolean;
  specific: number;
}

export const cookiesPaginationVar: ReactiveVar<ICookiesPaginationVar> =
  makeVar({
    collection: [],
    page: 1,
    total: 0,
  });

export const fetchCookies = () => (source: Observable<
  ApolloQueryResult<CookiesResponse | CookiesCacheResponse>
>) => source.pipe(
  pluck(
    'data',
    'cookies'
  ),
  take(1),
);

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class CookiesPaginationVar {
  readonly PAGE_SIZE = 20;
  readonly current$: Observable<ICookiesPaginationVar> = this.cookiesPaginationVarGQL
    .watch()
    .valueChanges
    .pipe(
      pluck(
        'data',
        'cookiesPaginationVar',
      ),
      untilDestroyed(this),
    );

  constructor(
    private cookiesPaginationVarGQL: CookiesPaginationVarGQL,
    private cookiesGQL: CookiesGQL,
    private cookiesCacheGQL: CookiesCacheGQL,
    private addCookieGQL: AddCookieGQL,
    private updateCookieGQL: UpdateCookieGQL,
    private deleteCookieGQL: DeleteCookieGQL,
  ) { }

  init(): void {
    this.cookiesGQL
      .fetch()
      .pipe(fetchCookies())
      .subscribe(cookies => {
        cookiesPaginationVar({
          ...cookiesPaginationVar(),
          collection: cookies.slice(0, this.PAGE_SIZE),
          total: cookies.length,
        });
      });
  }

  fetch(
    action: Partial<ICookiesPaginationAction>,
    filter?: Pick<Cookie, 'environment' | 'type' | 'snippet'>,
  ): void {
    let { collection, page } = cookiesPaginationVar();

    this.cookiesCacheGQL
      .fetch()
      .pipe(
        fetchCookies(),
        map(cookies => {
          if (!filter) { return cookies; }

          Object
            .entries(filter)
            .filter(entry => entry[1] != null)
            .forEach(entry => {
              cookies = cookies.filter(cookie => {
                return cookie[entry[0]].includes(entry[1].trim().toLocaleLowerCase());
              });
            });

          return cookies;
        }),
        take(1),
      )
      .subscribe(cookies => {
        switch (true) {
          case action.next: page += 1; break;
          case action.previous: page -= 1; break;
          default: page = action.specific; break;
        }

        const start = (page - 1) * this.PAGE_SIZE;
        collection = cookies.slice(start, start + this.PAGE_SIZE);

        cookiesPaginationVar({
          page,
          collection,
          total: cookies.length,
        });
      });
  }

  addOne(dto: Pick<Cookie, 'environment' | 'type' | 'snippet'>): void {
    this.addCookieGQL
      .mutate({ dto }, {
        update: (store, { data: { addCookie } }) => {
          this.cookiesCacheGQL
            .fetch()
            .pipe(fetchCookies())
            .subscribe(cookies => {
              store.writeQuery({
                query: this.cookiesCacheGQL.document,
                data: { cookies: [addCookie, ...cookies ]},
              });
            });
        }
      })
      .pipe(
        pluck(
          'data',
          'addCookie',
        ),
        take(1),
      )
      .subscribe(cookie => {
        const { collection, total } = cookiesPaginationVar();

        cookiesPaginationVar({
          ...cookiesPaginationVar(),
          total: total + 1,
          collection: [cookie, ...collection],
        });
      });
  }

  updateOne(dto: Omit<Cookie, '__typename'>): void {
    this.updateCookieGQL
      .mutate({ dto })
      .pipe(
        pluck(
          'data',
          'updateCookie',
        ),
        take(1),
      )
      .subscribe(update => {
        const { collection } = cookiesPaginationVar();
        cookiesPaginationVar({
          ...cookiesPaginationVar(),
          collection: collection.map(entity => entity.id === update.id ? update : entity),
        });
      });
  }

  deleteOne(dto: Pick<Cookie, 'id'>): void {
    this.deleteCookieGQL
      .mutate({ dto }, {
        update: (store, { data: { deleteCookie: { id } } }) => {
          this.cookiesCacheGQL
            .fetch()
            .pipe(fetchCookies())
            .subscribe(cookies => {
              store.evict({ fieldName: 'cookies', broadcast: false });
              store.writeQuery({
                query: this.cookiesCacheGQL.document,
                data: { cookies: cookies.filter(cookie => cookie.id !== id) },
              });
            });
        }
      })
      .pipe(
        pluck(
          'data',
          'deleteCookie',
        ),
        take(1),
      )
      .subscribe(({ id }) => {
        const { collection, total } = cookiesPaginationVar();

        cookiesPaginationVar({
          ...cookiesPaginationVar(),
          total: total - 1,
          collection: collection.filter(entity => entity.id !== id),
        });
      });
  }
}


