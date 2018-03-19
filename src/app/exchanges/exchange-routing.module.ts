import { FavExchangesComponent } from './fav-exchanges/fav-exchanges.component';
import { AllExchangesComponent } from './all-exchanges/all-exchanges.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeComponent } from './exchange.component';
import { AuthGuard } from '../_guards';

const routes: Routes = [
    {
        path: '', component: ExchangeComponent,
        children: [
            {path: '', redirectTo: 'all-exchanges', pathMatch: 'full'},
            {path: 'fav-exchanges', component: FavExchangesComponent},
            {path: 'all-exchanges', component: AllExchangesComponent},
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ExchangeRoutingModule {
}
