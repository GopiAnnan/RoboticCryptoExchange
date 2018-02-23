import { VendorWidgetsModule } from './../../shared/vendor-widgets.module';
import { ExchangeRoutingModule } from './exchange-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeComponent } from './exchange.component';

@NgModule({
  imports: [
    CommonModule,
    ExchangeRoutingModule,
    VendorWidgetsModule
  ],
  declarations: [ExchangeComponent]
})
export class ExchangeModule { }
