import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { TrackingComponent } from './tracking/tracking.component';

const routes: Routes = [
    { path: '', component: OrdersComponent},
    {path: 'tracking',component: OrdersComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrdersRoutingModule { }
