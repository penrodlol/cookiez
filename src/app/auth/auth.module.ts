import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxImageModule } from '@aposin/ng-aquila/image';
import { AuthModule as Auth0Module } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { AccountComponent } from './components/account/account.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NxButtonModule,
    NxImageModule,
    NxIconModule,
    Auth0Module.forRoot({
      domain: environment.auth0.domain,
      clientId: environment.auth0.client,
      audience: environment.auth0.audiance,
      scope: environment.auth0.scope,
      token_type: environment.auth0.token_type,
      cacheLocation: 'localstorage',
    }),
  ],
  exports: [
    AccountComponent,
  ],
})
export class AuthModule { }
