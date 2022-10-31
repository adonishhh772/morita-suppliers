import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ProductRoutingModule } from './products-routing';
import { ProductsComponent } from './products.component';
import { CategoryComponent } from './category/category.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableExporterModule} from 'mat-table-exporter';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ProductsComponent,
    AddComponent,
    CategoryComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSortModule,
    MatRadioModule,
    MatTableExporterModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ProductRoutingModule
  ]
})
export class ProductsModule { }
