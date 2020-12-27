import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../../environments/environment';
import { cookiesPaginationVar } from 'src/app/graphql/cookies/var/cookies-pagination.var';
import { environmentsAndTypesVar } from './environments-and-types/var/environments-and-types.var';
import { AuthService } from '@auth0/auth0-angular';
import { HttpHeaders } from '@angular/common/http';

export function createApollo(
  httpLink: HttpLink,
  auth: AuthService,
): ApolloClientOptions<any> {

  const link = ApolloLink.from([
    httpLink.create({
      uri: environment.graphql_uri,
      headers: new HttpHeaders()
        .set('Authorization', `Bearer <TOKEN>`)
    }),
  ]);

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cookiesPaginationVar: { read: () => cookiesPaginationVar() },
          environmentsAndTypesVar: { read: () => environmentsAndTypesVar() }
        }
      }
    }
  });

  return {
    link,
    cache,
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
      ],
    },
  ],
})
export class GraphQLModule { }
