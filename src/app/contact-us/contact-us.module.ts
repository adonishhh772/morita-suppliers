import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutingModule } from './contact-us-routing';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactUsComponent } from './contact-us.component';
import {MatSelectModule} from '@angular/material/select';
import { ComponentsModule } from '../Components/components.module';


@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ComponentsModule,
    ContactUsRoutingModule
  ]
})
export class ContactUsModule { }
