import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyRoutingModule } from './privacy-routing';
import { PrivacyComponent } from './privacy.component';
import { ComponentsModule } from '../Components/components.module';



@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PrivacyRoutingModule
  ]
})
export class PrivacyModule { }
