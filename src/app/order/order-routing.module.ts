import { MarketOrderComponent } from './market-order/market-order.component';
import { MarketOrderHistoryComponent } from './market-order-history/market-order-history.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { MyOrderHistoryComponent } from './my-order-history/my-order-history.component';

const routes: Routes = [
    { path: 'order', component: OrderComponent,
    children: [
        { path: 'my-order', component: MyOrderComponent},
        { path: 'my-order-history', component: MyOrderHistoryComponent},
        { path: 'market-order', component: MarketOrderComponent},
        { path: 'market-order-history', component: MarketOrderHistoryComponent},
        { path: '', component: MyOrderComponent},
    ] }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class OrderRoutingModule {
}
