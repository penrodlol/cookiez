import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppStartupService } from './app-startup.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FlexLayoutModule,
  ],
  providers: [
    AppStartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: (startup: AppStartupService) => () => startup.init(),
      deps: [AppStartupService],
      multi: true,
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
