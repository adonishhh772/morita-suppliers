import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing';
import { ComponentsModule } from '../Components/components.module';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    ComponentsModule,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    ProfileRoutingModule,
    MatButtonModule
  ]
})
export class ProfileModule { }
