import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing';
import { SearchComponent } from './search.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from '../Components/components.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatFormFieldModule,
    ComponentsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SearchModule { }
