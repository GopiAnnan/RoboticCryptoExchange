import { MarketRoutingModule } from './market-routing.module';
import { DisplayMarketComponent } from './display-market/display-market.component';
import { VendorWidgetsModule } from './../shared/vendor-widgets.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketComponent } from './market.component';

@NgModule({
  imports: [
    CommonModule,
    VendorWidgetsModule,
    MarketRoutingModule
  ],
  declarations: [MarketComponent, DisplayMarketComponent]
})
export class MarketModule { }
