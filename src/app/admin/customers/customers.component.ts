import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NavigationExtras, Router } from '@angular/router';
import {environment} from '../../../environments/environment';
import { DialogComponent } from '../components/dialog/dialog.component';
import decode from 'jwt-decode';
import { ActivityService } from 'src/app/Services/activity.service';
import { finalize } from 'rxjs';

export interface Contacts {
  id: string;
  contact_id: string;
  name: string;
  phone: string;
  email: string;
  gender:string;
  postal_code: string;
  orders: string;
  blacklist:boolean;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  displayedColumns: string[] = ['contact_id', 'name', 'phone', 'email','gender', 'postal_code', 'orders', 'actions'];
  selection = new SelectionModel<Contacts>(true, []);
  private readonly apiUrl = `${environment.apiUrl}`;
  contacts = [];
  contactId: string[] = [];
  isDelete = false;
  date = Date.now();
  isProcessing = true;
  contactCount = 0;
  numRows = 0;
  errorMessage = '';
  dataSource!: MatTableDataSource<Contacts>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private renderer: Renderer2,
                private router: Router,
                private elRef: ElementRef,
                private http: HttpClient,
                private activityService:ActivityService,
                private _snackBar: MatSnackBar,
                private matDialog: MatDialog) { }

                ngOnInit(): void {
                  this.getAllContacts();
              }

              ngAfterViewInit(): void {
                  const el = this.elRef.nativeElement.querySelector('.mat-select-arrow');
                  this.renderer.setStyle(el, 'margin', '0 4px');
              }

              applyFilter(event: Event): any {
                  const filterValue = (event.target as HTMLInputElement).value;
                  this.dataSource.filter = filterValue.trim().toLowerCase();

                  if (this.dataSource.paginator) {
                      this.dataSource.paginator.firstPage();
                  }
              }

              getAllContacts(): any {
                const token = localStorage.getItem('access_token')!;
                  this.http.get<any>(this.apiUrl + 'users/',{headers:{'authorization': token}}).subscribe({
                      next: data => {
                          this.contacts = data.data.filter((contact: any) => {
                              return contact.role !== 'admin';
                          });


                          const contact = Array.from({length: this.contacts.length}, (_, k) => this.createContact(k, this.contacts));
                          this.contactCount = this.contacts.length;
                          const selector = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement;
                          const selected = selector.querySelector('.selected_side_nav').previousSibling;
                          const el = selector.querySelector('.contact_badge');

                          el.childNodes[0].innerHTML = this.contactCount;
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

              createContact(index: any, data: any): any {
                  let cid = index + 1;
                  const id = data[index]._id;
                  const contact_id = 'C000' + cid;
                  const name = data[index].name;
                  const phone = data[index].phone;
                  const email = data[index].email;
                  const gender = data[index].gender;
                  const postal_code = data[index].postal_code;
                  const blacklist = data[index].blackList;
                  return {
                      id,
                      contact_id,
                      name,
                      phone,
                      email,
                      gender,
                      postal_code,
                      blacklist
                  };
              }

              openDialog(name:string,id: string,type:string,isBlackList:boolean): void {
                  this.contactId.push(id);
                  const data = {id:this.contactId,type:'customers',blacklisted:isBlackList,title: 'Are you sure you want to blacklist this customer?'};
                  if(type == 'whitelist'){
                    data.title = 'Are you sure you want to whitelist this customer?';
                  }
                  const dialogRef = this.matDialog.open(DialogComponent, {
                      data: data
                  });

                  dialogRef.afterClosed().subscribe(result => {
                      this.addActivity(name,type);
                      this.getAllContacts();
                  });

              }

              goToView(id: any): any {
                  const navigationExtras: NavigationExtras = {
                      queryParams: {id: id}
                  };
                  this.router.navigate(['admin/customers/view'], navigationExtras);
              }

              private addActivity(uName:string,type:string): any
              {
                let activityDetails: any;
                const accessToken = localStorage.getItem('access_token')!;
                const tokenPayload:any = decode(accessToken);
                activityDetails = {
                  client_id: tokenPayload.id,
                  title: 'Profile Blacklisted',
                  description: 'Profile <b>' + uName + '</b> blacklisted by admin',
                  type: 'Users',
                  name: uName,
                  };
                  if(type == 'whitelist'){
                      activityDetails.title = 'Profile Whitelisted';
                      activityDetails.description = 'Profile <b>' + uName + '</b> whitelisted by admin';
                  }
                this.activityService.add(activityDetails).pipe(finalize(() => {
                  })).subscribe(
                    (res) => {
                      },
                    (error) => {
                      if (error.error !== undefined) {
                          this._snackBar.open(error.error.msg, '', {
                              duration: 2000,
                          });
                      }
                    }
                  );

              }

              goToChat(id:String):void{

              }

}
