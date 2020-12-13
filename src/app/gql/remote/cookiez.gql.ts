import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { ICookie } from '../../model/cookie.model';

type GetCookiezResponse = { cookies: ICookie[] };

@Injectable({ providedIn: 'root' })
export class GetCookiezGQL extends Query<GetCookiezResponse> {
  document = gql`
    query GetCookiez {
      cookies {
        id
        environment
        type
        snippet
      }
    }
  `;
}
