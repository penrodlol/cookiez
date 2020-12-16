import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxModalModule } from '@aposin/ng-aquila/modal';

import { NavigationComponent } from './components/navigation.component';
import { SidebarDirective } from './directives/sidebar.directive';
import { ConfigurationModule } from '../configuration/configuration.module';

@NgModule({
  declarations: [
    NavigationComponent,
    SidebarDirective,
  ],
  imports: [
    CommonModule,
    ConfigurationModule,
    NxSidebarModule,
    NxActionModule,
    NxIconModule,
    NxButtonModule,
    NxModalModule,
  ],
  exports: [
    NavigationComponent,
  ],
})
export class NavigationModule { }
