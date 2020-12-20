import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStartupService } from './app-startup.service';
import { NavigationModule } from './feature/navigation/navigation.module';
import { GraphQLModule } from './graphql/graphql.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
    NavigationModule,
    GraphQLModule,
    PerfectScrollbarModule,
  ],
  providers: [
    AppStartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startup: AppStartupService) => () => startup.init(),
      deps: [AppStartupService],
      multi: true,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: {
        suppressScrollX: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
