import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthInterceptorsService } from './auth-interceptors.service';
import { LoggingInterceptService } from './logging-intercept.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorsService , multi:true
  },
  {
    provide:HTTP_INTERCEPTORS, useClass:LoggingInterceptService , multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
