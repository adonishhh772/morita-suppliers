import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing';
import { ComponentsModule } from '../Components/components.module';
import { NotFoundComponent } from './not-found.component';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    NotFoundRoutingModule
  ]
})
export class NotFoundModule { }
