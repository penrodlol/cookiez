import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation.component';

import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
  declarations: [
    NavigationComponent,
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
