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
import { AddEnvironmentGQL } from '../mutation/add-environmenet.gql';
import { AddTypeGQL } from '../mutation/add-type.gql';
import { DeleteEnvironmentGQL } from '../mutation/delete-environment.gql';
import { DeleteTypeGQL } from '../mutation/delete-type.gql';

export interface IEnvironmentsAndTypesVar {
  isCached: boolean;
  environments: Environment[];
  types: Type[];
}

export const environmentsAndTypesVar: ReactiveVar<IEnvironmentsAndTypesVar> =
  makeVar({
    isCached: false,
    environments: [],
    types: [],
  });

export type ConfigurationType = Environment['__typename'] | Type['__typename'];

export const fetchResponse = () => (source: Observable<any>) => source.pipe(
  pluck('data'),
  map(update => Object.values(update)[0]),
  take(1),
);

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class EnvironmentsAndTypesVar {
  readonly current$: Observable<any> = this.environmentsAndTypesVarGQL
    .watch()
    .valueChanges
    .pipe(
      pluck(
        'data',
        'environmentsAndTypesVar',
      ),
      untilDestroyed(this),
    );

  constructor(
    private apollo: Apollo,
    private environmentsAndTypesGQL: EnvironmentsAndTypesGQL,
    private environmentsAndTypesVarGQL: EnvironmentsAndTypesVarGQL,
  ) { }

  init(): void {
    if (environmentsAndTypesVar().isCached) { return; }

    this.environmentsAndTypesGQL
      .fetch()
      .pipe(
        pluck('data'),
        map(data => ({ ...data, isCached: true })),
        take(1),
      )
      .subscribe(environmentsAndTypesVar);
  }

  updateOne(type: ConfigurationType, dto: Pick<Environment | Type, 'id' | 'name'>): void {
    const isEnvironment = type === 'Environment';

    this.apollo
      .mutate({
        mutation: isEnvironment ? UpdateEnvironmentGQL : UpdateTypeGQL,
        variables: { dto },
      })
      .pipe(fetchResponse())
      .subscribe(({ id, name }) => {
        const { environments, types } = environmentsAndTypesVar();

        environmentsAndTypesVar({
          ...environmentsAndTypesVar(),
          environments:
            isEnvironment ?
              environments.map(entity => entity.id === id ? { ...entity, name } : entity) :
              environments,
          types:
            !isEnvironment ?
              types.map(entity => entity.id === id ? { ...entity, name } : entity) :
              types,
        });
      });
  }

  addOne(type: ConfigurationType, name: string): void {
    const isEnvironment = type === 'Environment';

    this.apollo
      .mutate({
        mutation: isEnvironment ? AddEnvironmentGQL : AddTypeGQL,
        variables: { dto: { name } },
      })
      .pipe(fetchResponse())
      .subscribe((entity: Environment | Type) => {
        const { environments, types } = environmentsAndTypesVar();

        environmentsAndTypesVar({
          ...environmentsAndTypesVar(),
          environments:
            isEnvironment ?
              [entity as Environment, ...environments] :
              environments,
          types:
            !isEnvironment ?
              [entity as Type, ...types] :
              types,
        });
      });
  }

  deleteOne(type: ConfigurationType, id: string): void {
    const isEnvironment = type === 'Environment';

    this.apollo
      .mutate({
        mutation: isEnvironment ? DeleteEnvironmentGQL : DeleteTypeGQL,
        variables: { dto: { id } },
      })
      .pipe(fetchResponse())
      .subscribe((deletedEntity: Pick<Environment | Type, 'id' | '__typename'>) => {
        const { environments, types } = environmentsAndTypesVar();

        environmentsAndTypesVar({
          ...environmentsAndTypesVar(),
          environments:
            isEnvironment ?
              environments.filter(entity => entity.id !== deletedEntity.id) :
              environments,
          types:
            !isEnvironment ?
              types.filter(entity => entity.id !== deletedEntity.id) :
              types,
        });
      });
  }
}
