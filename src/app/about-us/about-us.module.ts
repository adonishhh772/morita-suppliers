import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing';
import { AboutUsComponent } from './about-us.component';
import { ComponentsModule } from '../Components/components.module';



@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    ComponentsModule
  ]
})
export class AboutUsModule { }
