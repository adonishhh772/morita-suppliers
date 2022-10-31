import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import {CategoryService} from '../../../Services/category.service';
import {finalize} from 'rxjs/operators';
import decode from 'jwt-decode';
import { ActivityService } from 'src/app/Services/activity.service';

export interface DialogData {
  selected: any;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  isSubmitted = false;
  isProcessing = false;
  uName = localStorage.getItem('userName');
  private readonly apiUrl = `${environment.apiUrl}category/`;
  errorMessage = '';
  addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
  });
  constructor( public dialogRef: MatDialogRef<DialogComponent>,
    private http: HttpClient,
    private elRef: ElementRef,
    private activityService: ActivityService,
    private _snackBar: MatSnackBar,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
}

addCategory(): any {
    this.isSubmitted = true;
    if (!this.addCategoryForm.valid) {
        const invalidControl = this.elRef.nativeElement.querySelectorAll('.mat-form-field .ng-invalid');
        if (invalidControl.length > 0) {
            invalidControl[0].focus();
        }
        return false;
    } else {
        this.categoryService.add(this.addCategoryForm.value).pipe(finalize(() => {
            this.isProcessing = false;
            this.dialogRef.close();
        })).subscribe(
            (result) => {
                // this.addAddress(result._id);
                this._snackBar.open(result.message, '', {
                    duration: 2000,
                });
                this.newActivity(this.addCategoryForm.value.name,'add');
            },
            (error) => {
                if (error.error !== undefined) {
                    this._snackBar.open(error.error.msg, '', {
                        duration: 2000,
                    });
                } else {
                    // this.router.navigate([returnUrl]);
                }
            }
        );
    }
}

closePopup(): void {
    this.dialogRef.close();
}

newActivity(name: any,action:any): void{
  let activityDetails: any;
  const accessToken = localStorage.getItem('access_token')!;
  const tokenPayload:any = decode(accessToken);
  activityDetails = {
    client_id: 'N/A',
    title: 'New Category Added',
    description: 'Category ' + name+ ' Added by <b>' + tokenPayload.email + '</b>',
    type: 'Category',
    name: tokenPayload.email,
    };
    if(action == 'update'){
      activityDetails.title = 'Category '+ name + 'Updated';
      activityDetails.description = 'Category '+ name + ' Updated by <b>'+ tokenPayload.email +'</b>';
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

get errorControl(): any {
    return this.addCategoryForm.controls;
}

updateCat(): any {
    this.isSubmitted = true;
    if (!this.addCategoryForm.valid) {
        const invalidControl = this.elRef.nativeElement.querySelectorAll('.mat-form-field .ng-invalid');
        if (invalidControl.length > 0) {
            invalidControl[0].focus();
        }
        return false;
    } else {
        this.categoryService.updateCategory(this.addCategoryForm.value, this.data.selected.id).pipe(finalize(() => {
            this.isProcessing = false;
            this.dialogRef.close();
        })).subscribe(
            (result) => {
                this._snackBar.open(result.message, '', {
                    duration: 2000,
                });
                this.newActivity(this.addCategoryForm.value.name,'update');
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
