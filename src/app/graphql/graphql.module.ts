import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { AuthService } from '@auth0/auth0-angular';
import { httpLink } from './apollo-http.config';
import { inMemoryCache } from './apollo-cache.config';
import { NxDialogService, NxModalModule } from '@aposin/ng-aquila/modal';
import { ErrorDialogModule } from '../core/error-dialog/error-dialog.module';

export function createApollo(
  http: HttpLink,
  auth: AuthService,
  dialog: NxDialogService,
): ApolloClientOptions<any> {
  return {
    link: httpLink(http, auth, dialog),
    cache: inMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [
        HttpLink,
        AuthService,
        NxDialogService,
      ],
    },
  ],
  imports: [
    NxModalModule,
    ErrorDialogModule,
  ],
})
export class GraphQLModule { }
