import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { NavigationComponent } from './components/navigation.component';
import { SidebarDirective } from './directives/sidebar.directive';
import { ConfigurationModule } from '../configuration/configuration.module';
import { AuthModule } from 'src/app/auth/auth.module';

@NgModule({
  declarations: [
    NavigationComponent,
    SidebarDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConfigurationModule,
    AuthModule,
    NxSidebarModule,
    NxActionModule,
    NxIconModule,
    NxButtonModule,
    NxModalModule,
    NxPopoverModule,
  ],
  exports: [
    NavigationComponent,
  ],
})
export class NavigationModule { }
