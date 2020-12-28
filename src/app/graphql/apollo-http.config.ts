import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { AuthService } from '@auth0/auth0-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';

const authLink = (auth: AuthService) => setContext(async () => {
  const token = await auth.getAccessTokenSilently().toPromise();
  return !token ? {} : {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
});

const errorLink = () => onError(({ graphQLErrors, networkError }) => { });

export const httpLink = (
  http: HttpLink,
  auth: AuthService
) => ApolloLink.from([
  authLink(auth),
  errorLink(),
  http.create({
    uri: environment.graphql_uri,
  }),
]);
