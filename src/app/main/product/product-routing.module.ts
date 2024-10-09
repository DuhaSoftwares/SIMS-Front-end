import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { UnitsComponent } from './units/units.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { VariantsComponent } from './variants/variants.component';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    children: [
      { path: 'units', component: UnitsComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'add-products', component: AddProductComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'variants', component: VariantsComponent},
      
      // { path: '', redirectTo: 'units', pathMatch: 'full' }  // Default child route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
