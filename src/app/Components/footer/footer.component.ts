import { Component, OnInit, ElementRef } from '@angular/core';
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
  allMessage: any[] = [];
  hasMessage = false;
  furnitureCollpase: any;
  furnitureExpand: any;
  aboutCollapsee: any;
  aboutExpand: any;
  helpCollapase: any;
  helpExpand: any;
  token = localStorage.getItem('access_token')!;
  tokenPayload: any = {};
  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private messageSevice: MessagingService,
    private elf: ElementRef,
  ) { }

  ngOnInit(): void {
    if (this.token) {
      this.tokenPayload = decode(this.token);
      if (this.tokenPayload.role == 'users') {
        this.isUser = true;
      }
    }
  }

  goToNav(navigation: string) {
    console.log(navigation);
    this.router.navigateByUrl(navigation);
  }

  getMessages(id: string): any {
    this.messageSevice.getMessage(id).pipe(finalize(() => { })).subscribe(
      (result) => {
        this.allMessage = result.data;
        if (this.allMessage != null) {
          if (this.allMessage.length > 0) {
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

  sendMessage(): any {
    this.isSubmitted = true;
    if (!this.messageForm.valid) {
      return false;
    } else {
      // console.log(this.loginForm.value.email);
      let message = this.messageForm.value.message ? this.messageForm.value.message.toString() : '';
      this.messageSevice.sendMessage(message)
        .pipe(finalize(() => (this.isSubmitted = false)))
        .subscribe(
          (data) => {
            this.getMessages(this.tokenPayload.id);
            this._snackBar.open("Message send successfully", '', {
              duration: 2000,
            });
          },
          (error) => {

            if (error !== undefined) {
              if (error.error.msg == undefined) {
                this._snackBar.open(error.statusText, '', {
                  duration: 2000,
                });
              } else {
                this._snackBar.open(error.error.msg, '', {
                  duration: 2000,
                });
              }

            }
          }
        );
      return true;
    }
  }


  openMessageBox(): void {
    this.getMessages(this.tokenPayload.id);
    this.opened = true;
  }

  get errorControl(): any {
    return this.messageForm.controls;
  }

  toggleFurniture(params: any): void {
    if (params === "furniture") {
      const furnitureItems = this.elf.nativeElement.querySelector('.furniture-items');
      furnitureItems.classList.toggle('show');
    }
  }

  toggleAbout(params: any): void {
    if (params === 'about') {
      const aboutItems = this.elf.nativeElement.querySelector('.about-items');
      aboutItems.classList.toggle('show');
    }
  }
  toggleHelp(params: any): void {
    if (params === 'terms') {
      const helpItems = this.elf.nativeElement.querySelector('.help-items');
      helpItems.classList.toggle('show');
    }
  }
  toggleExpandCollapse(params: any): void {
    this.furnitureExpand = this.elf.nativeElement.querySelector('.selectFurniture1');
    this.furnitureCollpase = this.elf.nativeElement.querySelector('.selectFurniture2');
    this.aboutExpand = this.elf.nativeElement.querySelector('.selectAbout1');
    this.aboutCollapsee = this.elf.nativeElement.querySelector('.selectAbout2');
    this.helpExpand = this.elf.nativeElement.querySelector('.selectHelp1');
    this.helpCollapase = this.elf.nativeElement.querySelector('.selectHelp2');
    switch (params) {

      case "furnitureExpanded":
        this.furnitureExpand.classList.add('hidePlusIcon');
        this.furnitureCollpase.classList.remove('hideRemoveIcon');
        break;

      case "furnitureCollpased":
        this.furnitureCollpase.classList.add('hideRemoveIcon');
        this.furnitureExpand.classList.remove('hidePlusIcon');
        break;

      case "aboutExpanded":
        this.aboutExpand.classList.add('hidePlusIcon');
        this.aboutCollapsee.classList.remove('hideRemoveIcon');
        break;
      case "aboutCollpased":
        this.aboutCollapsee.classList.add('hideRemoveIcon');
        this.aboutExpand.classList.remove('hidePlusIcon');
        break;

      case "helpExpanded":
        this.helpExpand.classList.add('hidePlusIcon');
        this.helpCollapase.classList.remove('hideRemoveIcon');
        break;
      case "helpCollpased":
        this.helpCollapase.classList.add('hideRemoveIcon');
        this.helpExpand.classList.remove('hidePlusIcon');

    }


  }
}
