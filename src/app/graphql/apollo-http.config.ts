import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { AuthService } from '@auth0/auth0-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

const authLink = (auth: AuthService) => {
  return setContext(async () => {
    const token = await auth.getAccessTokenSilently().toPromise();
    return !token ? {} : {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });
};

export const httpLink = (
  http: HttpLink,
  auth: AuthService
) => ApolloLink.from([
  authLink(auth),
  http.create({
    uri: environment.graphql_uri,
  }),
]);
