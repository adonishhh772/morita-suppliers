import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutBillingRoutingModule } from './checkout-billing-routing';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CheckoutBillingComponent } from './checkout-billing.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CheckoutBillingComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CheckoutBillingRoutingModule
  ]
})
export class CheckoutBillingModule { }
