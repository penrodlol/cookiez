import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';

export type EnvironmentsAndTypesResponse = {
  environments: Environment[],
  types: Type[],
};

@Injectable({ providedIn: 'root' })
export class EnvironmentsAndTypesGQL extends Query<EnvironmentsAndTypesResponse> {
  document = gql`
    query EnvironmentsAndTypes {
      environments {
        id
        name
      }
      types {
        id
        name
      }
    }
  `;
}
