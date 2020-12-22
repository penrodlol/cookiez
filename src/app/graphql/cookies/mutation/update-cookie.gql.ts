import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Cookie } from '../../model/cookie.model';

export type UpdateCookieVariables = {
  dto: Omit<Cookie, '__typename'>;
};

export type UpdateCookieResponse = {
  updateCookie: Cookie;
};

@Injectable({ providedIn: 'root' })
export class UpdateCookieGQL extends Mutation<UpdateCookieResponse, UpdateCookieVariables> {
  document = gql`
    mutation updateCookie($dto: UpdateCookieDTO!) {
      updateCookie(dto: $dto) {
        id
        environment
        type
        snippet
      }
    }
  `;
}
