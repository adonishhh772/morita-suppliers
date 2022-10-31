import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../Components/components.module';
import { FAQSRoutingModule } from './faqs-routing';
import { FaqsComponent } from './faqs.component';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [FaqsComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    ComponentsModule,
    FAQSRoutingModule
  ]
})
export class FaqsModule { }
