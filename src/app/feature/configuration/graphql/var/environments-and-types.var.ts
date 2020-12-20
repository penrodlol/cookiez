import { Injectable } from '@angular/core';
import { makeVar, ReactiveVar } from '@apollo/client/core';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';
import { EnvironmentsAndTypesGQL } from '../query/environments-and-types.gql';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';
import { EnvironmentsAndTypesVarGQL } from '../query/environments-and-types-var.gql';
import { Apollo } from 'apollo-angular';
import { UpdateEnvironmentGQL } from '../mutation/update-environment.gql';
import { UpdateTypeGQL } from '../mutation/update-type.gql';
import { environment } from 'src/environments/environment';

export interface IEnvironmentsAndTypesVar {
  environments: Environment[];
  types: Type[];
}

export const environmentsAndTypesVar: ReactiveVar<IEnvironmentsAndTypesVar> =
  makeVar({
    environments: [],
    types: [],
  });

@UntilDestroy()
@Injectable()
export class EnvironmentsAndTypesVar {
  readonly current$: Observable<any> = this.environmentsAndTypesVarGQL
    .watch()
    .valueChanges
    .pipe(
      pluck(
        'data',
        'environmentsAndTypesVar',
      ),
      untilDestroyed(this)
    );

  constructor(
    private apollo: Apollo,
    private environmentsAndTypesGQL: EnvironmentsAndTypesGQL,
    private environmentsAndTypesVarGQL: EnvironmentsAndTypesVarGQL,
  ) { }

  init(): void {
    this.environmentsAndTypesGQL
      .fetch()
      .pipe(
        pluck('data'),
        take(1),
      )
      .subscribe(environmentsAndTypesVar);
  }

  updateOne(
    type: Environment['__typename'] | Type['__typename'],
    dto: Pick<Environment | Type, 'id' | 'name'>,
  ): void {
    this.apollo
      .mutate({
        mutation: type === 'Environment' ?
          UpdateEnvironmentGQL :
          UpdateTypeGQL,
        variables: { dto },
      })
      .pipe(
        pluck('data'),
        map(update => Object.values(update)[0]),
        take(1),
      )
      .subscribe(({ __typename, id, name }) => {
        const { environments, types } = environmentsAndTypesVar();

        const update = __typename === 'Environment' ?
          environments.map(entity => entity.id === id ? { ...entity, name } : entity) :
          types.map(entity => entity.id === id ? { ...entity, name } : entity);

        environmentsAndTypesVar({
          ...environmentsAndTypesVar(),
          ...update,
        });
      });
  }
}
