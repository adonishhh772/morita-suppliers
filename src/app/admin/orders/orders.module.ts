import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackingComponent } from './tracking/tracking.component';
import { OrdersRoutingModule } from './orders-routing';
import { OrdersComponent } from './orders.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    TrackingComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    OrdersRoutingModule,
  ]
})
export class OrdersModule { }
