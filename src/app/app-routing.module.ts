import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ItemComponent } from './components/item/item.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingComponent } from './components/shipping/shipping.component';

const routes: Routes = [
  { path: '', redirectTo:'Products',pathMatch: 'full' },
  { path: 'Products', component: ProductsComponent },
  { path: 'products/:productId', component: ItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'Checkout', component: ShippingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
