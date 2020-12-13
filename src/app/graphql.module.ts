import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../environments/environment';
import { cookiezState } from './app.state';

export function createApollo(
  httpLink: HttpLink
): ApolloClientOptions<any> {
  const link = httpLink.create({
    uri: environment.graphql_uri
  });

  const cache = new InMemoryCache({
    addTypename: false,
    typePolicies: {
      Query: {
        fields: {
          state: { read: () => cookiezState() }
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