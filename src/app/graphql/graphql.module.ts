import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../environments/environment';
import { cookiesPaginationVar } from '@home/graphql/var/cookies-pagination.var';
import { environmentsAndTypesVar } from '../feature/configuration/graphql/var/environments-and-types.var';

export function createApollo(
  httpLink: HttpLink
): ApolloClientOptions<any> {
  const link = httpLink.create({
    uri: environment.graphql_uri
  });

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
      ],
    },
  ],
})
export class GraphQLModule { }
