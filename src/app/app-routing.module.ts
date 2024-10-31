import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DashboardComponent } from './components/main/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'warehouse', loadChildren: () => import('./components/main/warehouse/warehouse.module').then(m => m.WarehouseModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AppRoutingModule {}
