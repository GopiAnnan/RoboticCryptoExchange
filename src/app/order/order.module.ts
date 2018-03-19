import { OrderRoutingModule } from './order-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrderComponent } from './my-order/my-order.component';
import { MyOrderHistoryComponent } from './my-order-history/my-order-history.component';
import { MarketOrderComponent } from './market-order/market-order.component';
import { MarketOrderHistoryComponent } from './market-order-history/market-order-history.component';
import { VendorWidgetsModule } from '../shared/vendor-widgets.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    VendorWidgetsModule,
    FormsModule,
  ],
  declarations: [MyOrderComponent, MyOrderHistoryComponent, MarketOrderComponent, MarketOrderHistoryComponent]
})
export class OrderModule { }
