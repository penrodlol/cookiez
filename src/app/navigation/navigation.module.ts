import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NavigationComponent } from './components/navigation.component';
import { SidebarDirective } from './directives/sidebar.directive';

@NgModule({
  declarations: [
    NavigationComponent,
    SidebarDirective,
  ],
  imports: [
    CommonModule,
    NxSidebarModule,
    NxActionModule,
    NxIconModule,
  ],
  exports: [
    NavigationComponent,
  ],
})
export class NavigationModule { }
