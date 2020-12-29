import { ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { NxDialogService } from '@aposin/ng-aquila/modal';
import { AuthService } from '@auth0/auth0-angular';
import { HttpLink } from 'apollo-angular/http';
import { environment } from 'src/environments/environment';
import { ErrorDialogComponent } from '../core/error-dialog/error-dialog.module';

const authLink = (auth: AuthService) => setContext(async () => {
  const token = await auth.getAccessTokenSilently().toPromise();
  return !token ? {} : {
    headers: {
      Authorization: `Bearer ${token}a`,
    },
  };
});

const errorLink = (dialog: NxDialogService) => onError(({ graphQLErrors }) => {
  dialog.open(ErrorDialogComponent, {
    minWidth: '500px',
    maxWidth: '600px',
    data: graphQLErrors ? graphQLErrors[0] : {
      message: 'It appears the server is temporarily unavailable.',
    },
  });
});

export const httpLink = (
  http: HttpLink,
  auth: AuthService,
  dialog: NxDialogService,
) => ApolloLink.from([
  authLink(auth),
  errorLink(dialog),
  http.create({
    uri: environment.graphql_uri,
  }),
]);
