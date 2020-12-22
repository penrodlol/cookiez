import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';

export type EnvironmentsAndTypesCacheResponse = {
  environments: Environment[],
  types: Type[],
};

@Injectable({ providedIn: 'root' })
export class EnvironmentsAndTypesCacheGQL extends Query<EnvironmentsAndTypesCacheResponse> {
  document = gql`
    query EnvironmentsAndTypesCache {
      environments @client {
        id
        name
      }
      types @client {
        id
        name
      }
    }
  `;
}
