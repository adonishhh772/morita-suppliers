import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { finalize } from 'rxjs';
import { MessagingService } from 'src/app/Services/messaging.service';

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
  token = localStorage.getItem('access_token')!;
  tokenPayload:any = decode(this.token);
  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
    });
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private messageSevice: MessagingService) { }

  ngOnInit(): void {
    if(this.token){
      if(this.tokenPayload.role == 'users'){
        this.isUser = true;
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
  }


  openMessageBox(): void{
    this.getMessages(this.tokenPayload.id);
    this.opened = true;
  }

  get errorControl(): any {
    return this.messageForm.controls;
  }


}
