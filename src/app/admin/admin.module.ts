import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ExchangeApiComponent } from './exchange-api/exchange-api.component';
import { ApiKeyComponent } from './api-key/api-key.component';
import { AdminRoutingModule } from './admin-routing.module';
import { VendorWidgetsModule } from '../shared/vendor-widgets.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    VendorWidgetsModule
  ],
  declarations: [AdminComponent, ExchangeApiComponent, ApiKeyComponent]
})
export class AdminModule { }
