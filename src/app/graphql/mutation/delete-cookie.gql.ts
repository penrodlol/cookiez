import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Cookie } from '../model/cookie.model';

export type DeleteCookieVariables = {
  dto: Pick<Cookie, 'id'>;
};

export type DeleteCookieResponse = {
  deleteCookie: Cookie;
};

@Injectable({ providedIn: 'root' })
export class DeleteCookieGQL extends Mutation<DeleteCookieResponse, DeleteCookieVariables> {
  document = gql`
    mutation deleteCookie($dto: DeleteCookieDTO!) {
      deleteCookie(dto: $dto) {
        id
      }
    }
  `;
}
