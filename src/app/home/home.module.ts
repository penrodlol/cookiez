import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';
import { NxMessageModule } from '@aposin/ng-aquila/message';

import { LineTruncationLibModule } from 'ngx-line-truncation';

import { HomeComponent } from './components/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NxTableModule,
    NxPaginationModule,
    NxTooltipModule,
    NxMessageModule,
    LineTruncationLibModule,
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
