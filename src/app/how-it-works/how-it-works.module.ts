import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowItWorksRoutingModule } from './how-it-works-routing';
import { HowItWorksComponent } from './how-it-works.component';
import { ComponentsModule } from '../Components/components.module';



@NgModule({
  declarations: [HowItWorksComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    HowItWorksRoutingModule
  ]
})
export class HowItWorksModule { }
