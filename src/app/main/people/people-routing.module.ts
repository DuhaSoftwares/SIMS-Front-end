import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';
import { CustomerComponent } from './customer/customer.component';
import { SuplierComponent } from './suplier/suplier.component';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent,
    children: [
      { path: 'customer', component: CustomerComponent },
      { path: 'suplier', component: SuplierComponent },


      
      // { path: '', redirectTo: 'units', pathMatch: 'full' }  // Default child route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
