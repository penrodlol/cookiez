import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';

@Injectable({ providedIn: 'root' })
export class GetCookiezCacheGQL extends Query {
  document = gql`
    query GetCookiezCacheGQL {
      cookies @client {
        environment
        type
        snippet
      }
    }
  `;
}
