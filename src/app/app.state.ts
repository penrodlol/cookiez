import { makeVar, ReactiveVar } from '@apollo/client/core';
import { ICookie } from './model/cookie.model';
import { produce } from 'immer';
import { Injectable } from '@angular/core';
import { pluck, take } from 'rxjs/operators';
import { GetCookiezCacheGQL } from './gql/local/cookiez-cache.gql';
import { GetCookiezGQL } from './gql/remote/cookiez.gql';
import { GetCookiezStateGQL } from './gql/local/cookiez-state.gql';

export interface ICookiezState {
  collection: ICookie[];
  page: number;
  total: number;
}

export interface ICookiezStateRequest {
  initial: boolean;
  nextPage: boolean;
  specificPage: number;
}

export const cookiezState: ReactiveVar<ICookiezState> =
  makeVar({
    collection: [],
    page: 1,
    total: 0,
  });

@Injectable({ providedIn: 'root' })
export class AppState {
  readonly BUFFER = 20;

  constructor(
    private cookiezGQL: GetCookiezGQL,
    private cacheGQL: GetCookiezCacheGQL,
    private stateGQL: GetCookiezStateGQL,
  ) { }

  state$ = this.stateGQL
    .watch()
    .valueChanges
    .pipe(pluck('data', 'state'));

  init = () => this.cookiezGQL
    .fetch()
    .pipe(take(1))
    .toPromise()

  fetch(request: Partial<ICookiezStateRequest>): void {
    this.cacheGQL
      .fetch()
      .pipe(
        pluck('data', 'cookies'),
        take(1),
      )
      .subscribe((cookies: ICookie[]) => {
        const newState = produce(cookiezState(), state => {
          if (request.initial) {
            state.total = cookies.length;
            state.page = 1;
            state.collection = cookies.slice(0, this.BUFFER);
            return;
          }

          request.nextPage ? state.page += 1 : (
            !request.specificPage ?
              state.page -= 1 :
              state.page = request.specificPage
          );

          const start = (state.page - 1) * this.BUFFER;

          state.collection = cookies.slice(start, start + this.BUFFER);
        });

        cookiezState(newState);
      });
  }
}
