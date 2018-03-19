
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrderModule } from './order/order.module';
import { MarketModule } from './market/market.module';
import { ExchangesModule } from './exchanges/exchanges.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { VendorWidgetsModule } from './shared/vendor-widgets.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
import 'ccxt';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCoreModule } from './app-core/app-core.module';
import { AppRoutesTitles } from './shared/routes/app-routes-titles';
import { OrderComponent } from './order/order.component';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService } from './_services';
import { JwtInterceptor, fakeBackendProvider } from './_helpers';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrderComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    OrderModule,
    MarketModule,
    FormsModule,
    RouterModule.forRoot([]),
    HttpModule,
    HttpClientModule,
    JsonpModule,
    AppRoutingModule,
    ExchangesModule,
    VendorWidgetsModule,
    AppCoreModule,
  ],
  providers: [AppRoutesTitles,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
