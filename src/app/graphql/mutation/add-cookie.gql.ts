import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';
import { Cookie } from '../model/cookie.model';

export type AddCookieVariables = {
  dto: Pick<Cookie, 'environment' | 'type' | 'snippet'>;
};

export type AddCookieResponse = {
  addCookie: Cookie;
};

@Injectable({ providedIn: 'root' })
export class AddCookieGQL extends Mutation<AddCookieResponse, AddCookieVariables> {
  document = gql`
    mutation addCookie($dto: AddCookieDTO!) {
      addCookie(dto: $dto) {
        id
        environment
        type
        snippet
      }
    }
  `;
}
