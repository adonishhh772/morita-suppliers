import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CheckoutBillingComponent} from './checkout-billing.component';

const routes: Routes = [
    {
        path: '',
        component: CheckoutBillingComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CheckoutBillingRoutingModule { }
