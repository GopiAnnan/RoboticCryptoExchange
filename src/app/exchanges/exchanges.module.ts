import { VendorWidgetsModule } from './../shared/vendor-widgets.module';
import { ExchangeRoutingModule } from './exchange-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange.component';
import { AllExchangesComponent } from './all-exchanges/all-exchanges.component';
import { FavExchangesComponent } from './fav-exchanges/fav-exchanges.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    VendorWidgetsModule,
    RouterModule
  ],
  declarations: [ExchangeComponent, AllExchangesComponent, FavExchangesComponent]
})
export class ExchangesModule { }
