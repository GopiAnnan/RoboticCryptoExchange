import { ExchangeModule } from './exchange/exchange.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { VendorWidgetsModule } from '../shared/vendor-widgets.module';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';
import 'ccxt';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCoreModule } from './app-core/app-core.module';
import { AppRoutesTitles } from '../shared/routes/app-routes-titles';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AppRoutingModule,
    ExchangeModule,
    VendorWidgetsModule,
    AppCoreModule,
  ],
  providers: [AppRoutesTitles],
  bootstrap: [AppComponent]
})
export class AppModule { }
