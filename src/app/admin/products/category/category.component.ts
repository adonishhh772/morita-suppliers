import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../dialog/dialog.component';

export interface Category {
  id: string;
  cat_id: string;
  type: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['cat_id', 'type', 'actions'];
  private readonly apiUrl = `${environment.apiUrl}`;
  numRows = 0;
  date = Date.now();
  errorMessage = '';
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private renderer: Renderer2,
    private router: Router,
    private elRef: ElementRef,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private matDialog: MatDialog) { }


  ngAfterViewInit(): void {
    const el = this.elRef.nativeElement.querySelector('.mat-select-arrow');
        this.renderer.setStyle(el, 'margin', '0 4px');
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
}

getAllCategory(): any {
  const token = localStorage.getItem('access_token')!;
  this.http.get<any>(this.apiUrl + 'category/',{headers:{'authorization': token}})
  .subscribe({
      next: data => {
          const contact = Array.from({length: data.data.length}, (_, k) => this.createCat(k, data.data));
          // Assign the data to the data source for the table to render
          this.dataSource = new MatTableDataSource(contact);

          this.numRows = this.dataSource.data.length;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

      },
      error: error => {
          this.errorMessage = error.message;
      }
  });

}

createCat(index: any, data: any): any {
  const id = data[index]._id;
  const type = data[index].type;
  const cat_id = index + 1;
  return {
      id,
      type,
      cat_id
  };
}

openDialog(row: any): void {
  const dialogRef = this.matDialog.open(DialogComponent, {
      data: {selected: row}
  });

  dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory();
  });

}

}
