import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { IEnvironmentsAndTypesVar } from '../var/environments-and-types.var';

type EnvironmentsAndTypesVarResponse = {
  environmentsAndTypesVar: IEnvironmentsAndTypesVar,
};

@Injectable({ providedIn: 'root' })
export class EnvironmentsAndTypesVarGQL extends Query<EnvironmentsAndTypesVarResponse> {
  document = gql`
    query EnvironmentsAndTypesVar {
      environmentsAndTypesVar @client
    }
  `;
}
