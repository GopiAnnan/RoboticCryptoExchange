import { ApiKeyComponent } from './api-key/api-key.component';
import { ExchangeApiComponent } from './exchange-api/exchange-api.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin-config', component: AdminComponent,
  children: [
      { path: 'exchange-apis', component: ExchangeApiComponent},
      { path: 'api-keys', component: ApiKeyComponent},
      { path: '', component: ApiKeyComponent},
  ] }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule { }