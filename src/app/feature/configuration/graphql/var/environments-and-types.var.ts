import { Injectable } from '@angular/core';
import { makeVar, ReactiveVar } from '@apollo/client/core';
import { Environment } from 'src/app/graphql/model/environment.model';
import { Type } from 'src/app/graphql/model/type.model';
import { EnvironmentsAndTypesGQL } from '../query/environments-and-types.gql';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { pluck, take } from 'rxjs/operators';
import { EnvironmentsAndTypesVarGQL } from '../query/environments-and-types-var.gql';

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
    private environmentsAndTypesGQL: EnvironmentsAndTypesGQL,
    private environmentsAndTypesVarGQL: EnvironmentsAndTypesVarGQL,
  ) { }

  init(): void {
    this.environmentsAndTypesGQL
      .fetch()
      .pipe(
        pluck('data'),
        take(1)
      )
      .subscribe(environmentsAndTypesVar);
  }
}
