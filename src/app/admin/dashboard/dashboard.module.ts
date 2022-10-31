import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing';
import { DashboardComponent } from './dashboard.component';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [DashboardComponent, DialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    DashboardRoutingModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule
  ]
})
export class DashboardModule { }
