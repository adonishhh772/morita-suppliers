import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface Products {
  id: string;
  product_id: string;
  name: string;
  type: string;
  price: string;
  availability: string;
  brand: string;
  category: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['select','product_id','name', 'type','price','brand','category', 'actions'];
  private readonly apiUrl = `${environment.apiUrl}`;
  selection = new SelectionModel<Products>(true, []);
  numRows = 0;
  date = Date.now();
  isToggled = false;
  isDelete = false;
  isMinimised = false;
  minimise = "remove";
  errorMessage = '';
  dataSource!: MatTableDataSource<Products>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private elRef: ElementRef,
    private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllProducts();
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  toggle(toggle:any, e: any):void{
    const listOptions = this.elRef.nativeElement.querySelector('.latest-options');
    switch(toggle){
      case 'open':
        this.isToggled = true;
        listOptions.classList.add('w-auto');
        break;
      case 'minimize':
        this.isMinimised = !this.isMinimised;
          // this.minimiseNew = "add";
        if(this.isMinimised){
          this.minimise = "add";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.products').style.display = 'none';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.components_container').style.display = 'none';
        }else{
          this.minimise = "remove";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0.25rem 0 0.25rem 0';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.products').style.display = 'block';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.components_container').style.display = 'block';

        }
         break;
      case 'close':
        listOptions.classList.remove('w-auto');
        this.isToggled = false;
        break;
    }
  }

  isAllSelected(): any {
    const numSelected = this.selection.selected.length;
    const numRows = this.numRows;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): any {
    if (this.isAllSelected()) {
        this.isDelete = false;
        this.selection.clear();
    } else {
        this.isDelete = true;
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
}

/** The label for the checkbox on the passed row */
checkboxLabel(row?: Products): string {
    if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}

  selectBox(e: any, row: any): any {
    if (e) {
        this.selection.toggle(row);
        if (this.selection.isSelected(row)) {
            this.isDelete = true;
        } else {
            if (this.selection.selected.length === 0) {
                this.isDelete = false;
            }

        }
    } else {
        return null;
    }

}


  getAllProducts(): any {
    const token = localStorage.getItem('access_token')!;
    this.http.get<any>(this.apiUrl + 'product/',{headers:{'authorization': token}})
    .subscribe({
        next: data => {
            const product = Array.from({length: data.data.length}, (_, k) => this.createProduct(k, data.data));
            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(product);

            this.numRows = this.dataSource.data.length;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

        },
        error: error => {
            this.errorMessage = error.message;
        }
    });

  }

  createProduct(index: any, data: any): any {
    const id = data[index]._id;
    const type = data[index].type;
    const name = data[index].name;
    const price = data[index].price;
    const brand = data[index].brand;
    const category = data[index].category;
    const product_id = index + 1;
    return {
        id,
        type,
        product_id,
        name,
        price,
        brand,
        category
    };
  }

}
