import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import decode from 'jwt-decode';
import { finalize, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../Services/user.service';
import { ActivityService } from '../Services/activity.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileName = '';
  profileId = '';
  private _jsonURL = 'assets/timezones.json';
  memberDate = '';
  imageUrl = '';
  hasImage = false;
  uploadedFiles: Array<File> = [];
  padding = 'pt-7';
  editAble = false;
  isSubmitted = false;
  isLoaded = false;
  hasActivity = false;
  isProcessing = false;
  today: string | null = new DatePipe('en-US').transform(new Date(), 'MM/dd/yyyy');
  naviagtionData: any[] = [];
  country: any[] = [];
  timeZone: any[] = [];
  private readonly apiUrl = `${environment.apiUrl}`;
  imgUrl = `${environment.imgUrl}`;
  users: any[] = [];
  activity: any[] = [];
  currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  updateProfileForm!: FormGroup;
  errorMessage = '';
  token = localStorage.getItem('access_token')!;
  public ctrls: { [name: string]: FormControl } = {};
  constructor(private http:HttpClient,
    private _snackBar: MatSnackBar,
    public userSerivce: UserService,
    private activityService: ActivityService,) { }

  ngOnInit(): void {
    this.getJSON().subscribe(data => {
      this.timeZone = data;
    });
    const tokenPayload:any = decode(this.token);
    const id = tokenPayload.id;
    this.getProfile(id);
  }


  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
}



  fileChange(element: any): any {
    this.uploadedFiles = element.target.files;
    let formData = new FormData();
    formData.append('id', this.profileId);
    for (let i = 0; i < this.uploadedFiles.length; i++) {
        const filename = this.profileName.replace(' ', '_')  + '.jpg';
        formData.append('pic', filename.toLowerCase());
        formData.append('avatar', this.uploadedFiles[i], filename.toLowerCase());
    }

    this.http.post(this.apiUrl + 'users/upload', formData)
        .subscribe((result) => {
            this.editAble = false;
            this.newActivity(true);
            // this.getContacts();
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
        if (this.users.length !== 0) {
          for (let key in this.users[0]) {
              if (this.users[0].hasOwnProperty(key)) {
                  this.assignValues(key);
               }
          }
          this.assignFirstValues();
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

  private assignValues(key: string): any {
    switch (key) {
        case 'name':
            this.naviagtionData.push(
                {
                    key: 'Full Name',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'person',
                    required: true,
                    disabled: false,
                    inputType: 'text'
                }
            );
            break;
        case 'email':
            this.naviagtionData.push(
                {
                    key: 'Email',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'email',
                    required: true,
                    disabled: true,
                    inputType: 'email'
                }
            );
            break;
        case 'birthday':
            this.naviagtionData.push(
                  {
                      key: 'Birthday',
                      nameKey: key,
                      value: this.users[0][key],
                      icon: 'calendar_today',
                      required: true,
                      disabled: false,
                      inputType: 'date'
                  }
              );
              break;
        case 'gender':
            this.naviagtionData.push(
                {
                    key: 'Gender',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'transgender',
                    required: true,
                    disabled: false,
                    inputType: 'radio'
                }
            );
            break;
        case 'disability':
          this.naviagtionData.push(
                  {
                      key: 'Do you have any disability?',
                      nameKey: key,
                      value: this.users[0][key],
                      icon: 'accessible',
                      required: true,
                      disabled: false,
                      inputType: 'radio'
                  }
              );
              break;

        case 'reply_email':
            this.naviagtionData.push(
                {
                    key: 'Reply Email',
                    nameKey: key,
                    value: this.users[0]['email'],
                    icon: 'drafts',
                    required: true,
                    disabled: false,
                    inputType: 'email'
                }
            );
            break;
        case 'phone':
            this.naviagtionData.push(
                {
                    key: 'Phone',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'stay_current_portrait',
                    required: true,
                    disabled: false,
                    inputType: 'number'
                }
            );
            break;
        case 'street':
            this.naviagtionData.push(
                {
                    key: 'Street',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'traffic',
                    required: true,
                    disabled: false,
                    inputType: 'text'
                }
            );
            break;
        case 'address':
            this.naviagtionData.push(
                {
                    key: 'Address',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'home',
                    required: true,
                    disabled: false,
                    inputType: 'text'
                }
            );
            break;
        case 'postal_code':
            this.naviagtionData.push(
                {
                    key: 'Post Code',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'location_city',
                    required: true,
                    disabled: false,
                    inputType: 'text'
                }
            );
            break;
        case 'county':
            this.naviagtionData.push(
                {
                    key: 'County',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'local_shipping',
                    required: true,
                    disabled: false,
                    inputType: 'text'
                }
            );
            break;
        case 'description':
            this.naviagtionData.push(
                {
                    key: 'About yourself',
                    nameKey: key,
                    value: this.users[0][key],
                    icon: 'description',
                    required: false,
                    disabled: false,
                    inputType: 'text'
                }
            );
            break;

    }
}

private assignFirstValues(): any {
  if (this.naviagtionData.find(x => x.nameKey === 'name') !== undefined) {
    if (this.naviagtionData.find(x => x.nameKey === 'name').nameKey !== 'name') {
        this.naviagtionData.push({
            key: 'Full Name',
            nameKey: 'name',
            value: '',
            icon: 'person',
            required: true,
            disabled: false,
            inputType: 'text'
        });
    }
  }
    if (this.naviagtionData.find(x => x.nameKey === 'birthday') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'birthday').nameKey !== 'birthday') {
            this.naviagtionData.push({
                key: 'Birthday',
                nameKey: 'birthday',
                value: this.today,
                icon: 'calendar_today',
                required: true,
                disabled: false,
                inputType: 'date'
            });
        }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'gender') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'gender').nameKey !== 'gender') {
            this.naviagtionData.push({
                key: 'Gender',
                nameKey: 'gender',
                value: '',
                icon: 'transgender',
                required: true,
                disabled: false,
                inputType: 'radio'
            });
        }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'disability') !== undefined) {
      if (this.naviagtionData.find(x => x.nameKey === 'disability').nameKey !== 'disability') {
          this.naviagtionData.push({
              key: 'Do you have any disability?',
              nameKey: 'disability',
              value: '',
              icon: 'accessible',
              required: true,
              disabled: false,
              inputType: 'radio'
          });
      }
    }


    if (this.naviagtionData.find(x => x.nameKey === 'email') !== undefined) {
      if (this.naviagtionData.find(x => x.nameKey === 'email').nameKey !== 'email') {
          this.naviagtionData.push({
              key: 'Email',
              nameKey: 'email',
              value: this.users[0].email,
              icon: 'email',
              required: true,
              disabled: true,
              inputType: 'email'
          });
      }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'reply_email') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'reply_email').nameKey !== 'reply_email') {
            this.naviagtionData.push({
                key: 'Reply Email',
                nameKey: 'reply_email',
                value: this.users[0].email,
                icon: 'drafts',
                required: true,
                disabled: false,
                inputType: 'email'
            });
        }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'phone') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'phone').nameKey !== 'phone') {
            this.naviagtionData.push({
                key: 'Phone',
                nameKey: 'phone',
                value: '',
                icon: 'stay_current_portrait',
                disabled: false,
                required: true,
                inputType: 'number'
            });
        }
    }


    if (this.naviagtionData.find(x => x.nameKey === 'street') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'street').nameKey !== 'street') {
            this.naviagtionData.push({
                key: 'Street',
                nameKey: 'street',
                value: '',
                icon: 'traffic',
                disabled: false,
                required: true,
                inputType: 'select'
            });
        }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'postal_code') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'postal_code').nameKey !== 'postal_code') {
            this.naviagtionData.push({
                key: 'Post Code',
                nameKey: 'postal_code',
                value: '',
                icon: 'local_shipping',
                required: true,
                disabled: false,
                inputType: 'text'
            });
        }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'address') !== undefined) {
        if (this.naviagtionData.find(x => x.nameKey === 'address').nameKey !== 'address') {
            this.naviagtionData.push({
                key: 'Address',
                nameKey: 'address',
                value: '',
                icon: 'home',
                required: true,
                disabled: false,
                inputType: 'text'
            });
        }
    }

    if (this.naviagtionData.find(x => x.nameKey === 'county') !== undefined) {
      if (this.naviagtionData.find(x => x.nameKey === 'county').nameKey !== 'county') {
          this.naviagtionData.push({
              key: 'County',
              nameKey: 'county',
              value: '',
              icon: 'local_shipping',
              required: true,
              disabled: false,
              inputType: 'text'
          });
      }
    }


    if (this.naviagtionData.find(x => x.nameKey === 'description') !== undefined) {
      if (this.naviagtionData.find(x => x.nameKey === 'description').nameKey !== 'description') {
          this.naviagtionData.push({
              key: 'About Yourself',
              nameKey: 'description',
              value: '',
              icon: 'description',
              required: true,
              disabled: false,
              inputType: 'text'
          });
      }
    }
}

private getCountryInfo(): any {
  this.http.get<any>('http://ip-api.com/json').subscribe({
      next: data => {
          this.naviagtionData.push({
                  key: 'Country',
                  nameKey: 'country',
                  value: data.country,
                  icon: 'flag',
                  required: false,
                  disabled: false,
                  inputType: 'select'
              },
              {
                  key: 'State',
                  nameKey: 'state',
                  value: data.regionName,
                  icon: 'location_city',
                  required: false,
                  disabled: false,
                  inputType: 'text'
              });
          // this.currentCountry = ;
      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
}



toggleEdit(): any {
  this.editAble = !this.editAble;
  if (this.editAble) {
      for (const keys of this.naviagtionData) {
          this.addFormControl(keys);
      }
      this.padding = 'pt-15';
  } else {
      this.padding = 'pt-7';
  }
}

openFile(e: any): any{
  let element: HTMLElement = document.getElementById('avatar_image') as HTMLElement;
  element.click();
  return false;
}

get errorControl(): any {
  return this.updateProfileForm.controls;
}

addFormControl(key: any): any {
  switch (key.nameKey) {
      case 'reply_email':
          this.ctrls[key.nameKey] = new FormControl(key.value, {
              validators: [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]
          });
          break;
      case 'phone':
          this.ctrls[key.nameKey] = new FormControl(key.value, {
              validators: [Validators.required, Validators.maxLength(11), Validators.minLength(11)]
          });
          break;
      case 'name':
          this.ctrls[key.nameKey] = new FormControl(key.value, {
              validators: [Validators.required, Validators.pattern('^[A-Za-z ]+$')]
          });
          break;
      case 'gender':
          this.ctrls[key.nameKey] = new FormControl(key.value, {
              validators: [Validators.required]
          });
          break;
      case 'birthday':
          this.ctrls[key.nameKey] = new FormControl(key.value, {
              validators: [Validators.required]
          });
          break;
      default:
          this.ctrls[key.nameKey] = new FormControl(key.value);
          break;
  }
  // this.ctrls[key] = new FormControl(this.data[key], {
  //     validators: [Validators.required]
  // });

  this.updateProfileForm = new FormGroup(this.ctrls);
}

updateProfile(): any {
  // console.log(this.updateProfileForm.controls);
  this.isSubmitted = true;
  if (!this.updateProfileForm.valid) {
      return false;
  } else {
      this.isProcessing = true;
          this.userSerivce.updateProfile(this.updateProfileForm.value).pipe(finalize(() => {
              this.isProcessing = false;
          })).subscribe(
              (result) => {
                this.newActivity(false);
                  this.assignValuesAgain(result.data);
                  this.profileName = result.data.name;
                  // this.naviagtionData.push(history.state.data[key]);
                  this._snackBar.open(result.message, '', {
                      duration: 2000,
                  });

                  this.editAble = false;
                  // this.router.navigate([returnUrl]);
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

  private assignValuesAgain(data: any): any {
    for (const keys of this.naviagtionData) {
        keys.value = data[keys.nameKey];
    }
}

newActivity(image:boolean): void{
  let activityDetails: any;
  const accessToken = localStorage.getItem('access_token')!;
  const tokenPayload:any = decode(accessToken);
  const uName = this.updateProfileForm.value.name? this.updateProfileForm.value.name: tokenPayload.email;
  activityDetails = {
    client_id: tokenPayload.id,
    title: 'Users Updated',
    description: 'User <b>' + uName + '</b> Updated',
    type: 'Users',
    name: uName,
    };
    if(image){
      activityDetails.title = 'Profile Picture Uploaded';
      activityDetails.description = '<b>'+ uName +'</b> uploaded their profile picture';
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

}
