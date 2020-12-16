import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Cookie } from 'src/app/graphql/model/cookie.model';

export type CookiesResponse = { cookies: Cookie[] };

@Injectable({ providedIn: 'root' })
export class CookiesGQL extends Query<CookiesResponse> {
  document = gql`
    query Cookies {
      cookies {
        id
        environment
        type
        snippet
      }
    }
  `;
}
