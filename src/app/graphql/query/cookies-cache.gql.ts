import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Cookie } from 'src/app/graphql/model/cookie.model';

export type CookiesCacheResponse = { cookies: Cookie[] };

@Injectable({ providedIn: 'root' })
export class CookiesCacheGQL extends Query<CookiesCacheResponse> {
  document = gql`
    query CookiesCache {
      cookies @client {
        id
        environment
        type
        snippet
      }
    }
  `;
}
