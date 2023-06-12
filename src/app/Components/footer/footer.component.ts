import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { finalize } from 'rxjs';
import { MessagingService } from 'src/app/Services/messaging.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isUser = false;
  opened = false;
  isSubmitted = false;
  allMessage : any[] = [];
  hasMessage = false;
  userName = '';
  token = localStorage.getItem('access_token')!;
  tokenPayload:any ={};
  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
    });
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private messageSevice: MessagingService
    ) { }

  ngOnInit(): void {
    if(this.token){
      this.tokenPayload =  decode(this.token);
      if(this.tokenPayload.role == 'users'){
        this.isUser = true;
        this.userName = this.tokenPayload.name? this.tokenPayload.name : this.tokenPayload.email;
      }
    }
  }

  goToNav(navigation: string){
    console.log(navigation);
    this.router.navigateByUrl(navigation);
  }

  getMessages(id: string): any{
    this.messageSevice.getMessage(id).pipe(finalize(() => {})).subscribe(
      (result) => {
        this.allMessage = result.data;
        if(this.allMessage != null){
          if(this.allMessage.length > 0){
            this.hasMessage = true;
          }
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

  sendMessage():any{
    this.isSubmitted = true;
    if (!this.messageForm.valid) {
      return false;
      } else {
      let message = this.messageForm.value.message ? this.messageForm.value.message.toString() : '';
      let user_id = this.tokenPayload.id;
      let status = 'sent to admin';
      let isAdmin = false;
      const msg = {'message':message,'name':this.userName,'isAdmin':isAdmin,'user_id':user_id,'status':status};
       this.messageSevice.sendMessage(msg)
          .pipe(finalize(() => (this.isSubmitted = false)))
          .subscribe(
              (data) => {
                this.getMessages(this.tokenPayload.id);
                this._snackBar.open("Message send successfully", '', {
                  duration: 2000,
              });

              this.messageForm.reset();
              },
              (error) => {
              }
          );
      return true;
  }
  }


  openMessageBox(): void{
    this.getMessages(this.tokenPayload.id);
    this.opened = true;
  }

  get errorControl(): any {
    return this.messageForm.controls;
  }


}
