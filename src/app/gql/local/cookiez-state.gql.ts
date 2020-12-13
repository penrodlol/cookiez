import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { ICookiezState } from 'src/app/app.state';

type GetCookiezStateResponse = {
  state: ICookiezState,
};

@Injectable({ providedIn: 'root' })
export class GetCookiezStateGQL extends Query<GetCookiezStateResponse> {
  document = gql`query GetCookiezState { state @client }`;
}
