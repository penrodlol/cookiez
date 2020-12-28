import { InMemoryCache } from '@apollo/client/core';
import { cookiesPaginationVar } from './cookies/var/cookies-pagination.var';
import { environmentsAndTypesVar } from './environments-and-types/var/environments-and-types.var';

export const inMemoryCache = () => new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cookiesPaginationVar: { read: () => cookiesPaginationVar() },
        environmentsAndTypesVar: { read: () => environmentsAndTypesVar() }
      }
    }
  }
});
