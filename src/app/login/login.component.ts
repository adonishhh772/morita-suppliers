import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../Components/dialog/dialog.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import decode from 'jwt-decode';
import { UserService } from '../Services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  hidePass = true;
  isSubmitted = false;
  error = '';
  isValidated = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  constructor(public dialog: MatDialog,private auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
  }

  openDialog(e:any): void{
    e.stopImmediatePropagation();
    e.preventDefault();
    const dialogRef = this.dialog.open(DialogComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleVisibility(e:any): void{
    e.stopImmediatePropagation();
    e.preventDefault();
    this.hidePass = !this.hidePass
  }

  login(): any {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
        return false;
    } else {
        this.isValidated = true;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        // console.log(this.loginForm.value.email);
        let email = this.loginForm.value.email ? this.loginForm.value.email.toString() : '';
        let password = this.loginForm.value.password ? this.loginForm.value.password.toString() : '';
        this.auth.login(email, password)
            .pipe(finalize(() => (this.isSubmitted = false)))
            .subscribe(
                (data) => {
                  const tokenPayload:any = decode(data.token);
                  if(tokenPayload.blacklisted){
                    this.auth.logout();
                    this._snackBar.open('Your profile has been blacklisted. Please contact your admin for further information', 'Contact Us', {
                      duration: 3000,
                    }).onAction()
                    .subscribe(() => this.router.navigateByUrl('/contact-us'));;
                  }else{
                    if(tokenPayload.role == 'admin'){
                      this.router.navigate(['admin/dashboard']);
                    }else{
                      this.router.navigate([returnUrl]);
                    }
                  }
                },
                (error) => {

                    if (error !== undefined) {
                      if(error.error.msg == undefined){
                        this._snackBar.open(error.statusText, '', {
                          duration: 2000,
                      });
                      }else{
                        this._snackBar.open(error.error.msg, '', {
                          duration: 2000,
                      });
                      }

                    } else {
                        this.router.navigate([returnUrl]);
                    }
                }
            );
        return true;
    }

}

get errorControl(): any {
  return this.loginForm.controls;
}



}

