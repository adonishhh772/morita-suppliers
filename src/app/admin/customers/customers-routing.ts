import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


const routes: Routes = [
    {path: '',component: CustomersComponent},
    {path: 'view',component: ViewCustomerComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule { }
