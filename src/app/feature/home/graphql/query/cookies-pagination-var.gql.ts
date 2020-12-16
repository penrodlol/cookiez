import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ICookiesPaginationVar } from '../var/cookies-pagination.var';

type CookiesPaginationVarResponse = {
  cookiesPaginationVar: ICookiesPaginationVar,
};

@Injectable({ providedIn: 'root' })
export class CookiesPaginationVarGQL extends Query<CookiesPaginationVarResponse> {
  document = gql`
    query CookiesPaginationVar {
      cookiesPaginationVar @client
    }
  `;
}
