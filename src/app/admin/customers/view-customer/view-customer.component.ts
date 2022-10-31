import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ActivityService } from 'src/app/Services/activity.service';
import { UserService } from 'src/app/Services/user.service';
import decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  private readonly apiUrl = `${environment.apiUrl}`;
  imgUrl = `${environment.imgUrl}`;
  imageUrl = '';
  hasImage = false;
  profileName = '';
  profileId = '';
  isLoaded = false;
  contactId: string[] = [];
  hasActivity = false;
  errorMessage = '';
  memberDate = '';
  users: any[] = [];
  activity: any[] = [];
  token = localStorage.getItem('access_token')!;
  constructor(private http:HttpClient,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public userSerivce: UserService,
    private matDialog: MatDialog,
    private activityService: ActivityService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.getProfile(params['id']);

  });
}

  getProfile(id:any):void{
    this.http.get<any>(this.apiUrl + 'users/'+id,{headers:{'authorization': this.token}}).subscribe({
      next: data => {
        this.users.push(data.data);
        this.isLoaded = true;
        this.imageUrl = data.data.profile_photo;
        if(this.imageUrl){
            this.hasImage = true;
        }

        this.profileName = this.users[0].email;
        this.profileId = this.users[0]._id;
        this.memberDate = this.users[0].create_date;
        this.getClientActivity(this.profileId);
        // console.log(this.naviagtionData);
      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
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
        this.getProfile(id);
    });

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



  getClientActivity(id:any):any{
      this.activityService.getActivity(id).pipe(finalize(() => {
    })).subscribe(
        (result) => {
           this.activity = result.data;
           this.activity.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
           if(this.activity.length > 0){
             this.hasActivity = true;
           }
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
