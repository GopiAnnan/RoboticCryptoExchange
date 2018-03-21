import { ExchangesModule } from './exchanges/exchanges.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

const routes: Routes = [
  {path : 'db-exchange/:id', component: DashboardComponent, canActivate: [AuthGuard] },
  {path : 'db-exchange', component: DashboardComponent, canActivate: [AuthGuard] },
  {path : 'exchanges', loadChildren: () => ExchangesModule, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  {path : 'exchange-market', redirectTo: 'exchange-market', pathMatch: 'full', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  {path : 'admin-config', redirectTo: 'admin-config', pathMatch: 'full', canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
  {path : 'order', redirectTo: 'order', pathMatch: 'full', canActivate: [AuthGuard], canActivateChild: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path : '', redirectTo: 'db-exchange', pathMatch: 'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
