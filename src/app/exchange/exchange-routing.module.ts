import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './exchange.component';

const routes: Routes = [
    { path: '', component: ExchangeComponent },
    { path: 'exchanges', component: ExchangeComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ExchangeRoutingModule {
}
