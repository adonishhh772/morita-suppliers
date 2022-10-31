import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing';
import { DetailsComponent } from './details.component';
import { ComponentsModule } from '../Components/components.module';
import { NgxImageZoomModule } from "ngx-image-zoom";
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ComponentsModule,
    MatExpansionModule,
    NgxImageZoomModule,
    MatDialogModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
