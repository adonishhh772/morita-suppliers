import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotRoutingModule } from './forgot-routing';
import { ForgotComponent } from './forgot.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ComponentsModule } from '../Components/components.module';



@NgModule({
  declarations: [ForgotComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    ComponentsModule,
    MatButtonModule,
    MatFormFieldModule,
    ForgotRoutingModule,
  ]
})
export class ForgotModule { }
