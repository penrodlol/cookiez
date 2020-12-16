import { Injectable } from '@angular/core';
import { makeVar, ReactiveVar } from '@apollo/client/core';
import { pluck, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cookie } from 'src/app/graphql/model/cookie.model';
import { CookiesCacheGQL, CookiesCacheResponse } from '../query/cookies-cache.gql';
import { CookiesGQL, CookiesResponse } from '../query/cookies.gql';
import { ApolloQueryResult } from '@apollo/client/core';
import { CookiesPaginationVarGQL } from '../query/cookies-pagination-var.gql';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

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
@Injectable()
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

  fetch(action: Partial<ICookiesPaginationAction>): void {
    let { collection, page } = cookiesPaginationVar();

    this.cookiesCacheGQL
      .fetch()
      .pipe(fetchCookies())
      .subscribe(cookies => {
        switch (true) {
          case action.next: page += 1; break;
          case action.previous: page -= 1; break;
          default: page = action.specific; break;
        }

        const start = (page - 1) * this.PAGE_SIZE;
        collection = cookies.slice(start, start + this.PAGE_SIZE);

        cookiesPaginationVar({
          ...cookiesPaginationVar(),
          page,
          collection,
        });
      });
  }
}


