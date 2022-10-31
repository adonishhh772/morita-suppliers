import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    { path: '', component: ProductsComponent},
    {path: 'add',component: AddComponent},
    {path: 'category',component: CategoryComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule { }
