import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NxTableModule } from '@aposin/ng-aquila/table';
import { NxPaginationModule } from '@aposin/ng-aquila/pagination';

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
    RouterModule.forChild(routes),
  ]
})
export class HomeModule { }
