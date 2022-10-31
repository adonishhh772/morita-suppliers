import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: string;
  type: string;
  title: string;
  blacklisted: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  isDeleting = false;
  private readonly apiUrl = `${environment.apiUrl}`;
  constructor(public router: Router,
    public http: HttpClient,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      dialogRef.disableClose = true;
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteAll(id: any, type: any,blackList:any): void {
    this.isDeleting = true;
    for (const keys of id) {
        switch (type) {
            case 'customers':
                this.blacklistCustomers(keys,blackList);
                break;
          }
      }
  }

  blacklistCustomers(id: string,blackList:boolean):void{
    if(blackList){
      this.userService.whiteListContact(id).pipe(finalize(() => {
        this.isDeleting = false;
        this.dialogRef.close();
    })).subscribe(
        (result) => {
            this._snackBar.open(result.message, '', {
                duration: 2000,
            });
        },
        (error) => {
            if (error.error !== undefined) {
                this._snackBar.open(error.error.msg, '', {
                    duration: 2000,
                });
            }
        }
    );
    }else{
      this.userService.blackListContact(id).pipe(finalize(() => {
        this.isDeleting = false;
        this.dialogRef.close();
    })).subscribe(
        (result) => {
            this._snackBar.open(result.message, '', {
                duration: 2000,
            });
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

  }



}
