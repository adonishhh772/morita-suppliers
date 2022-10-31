import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children:[
          {path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
          {path: 'customers', loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule)},
          {path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)},
          {path: 'orders', loadChildren: () => import('../orders/orders.module').then(m => m.OrdersModule)},
         ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
