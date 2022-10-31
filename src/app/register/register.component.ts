import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import decode from 'jwt-decode';
import { ActivityService } from 'src/app/Services/activity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePass = true;
  hideConPass = true;
  isSubmitted = false;
  error = '';
  pass: AbstractControl | undefined;
  password: AbstractControl | undefined;
  isValidated = false;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    repassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private auth: AuthService, private activityService: ActivityService,
    private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
    this.pass = this.registerForm.controls['password'];
    this.password = this.registerForm.controls['repassword'];
    this.registerForm.addValidators(
      matchValidator(this.pass, this.password)
    );

    console.log(this.registerForm.errors);
  }

  ngOnInit(): void {
  }

  register(): any {
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
        return false;
    } else {
        this.isValidated = true;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
        // console.log(this.loginForm.value.email);
        let email = this.registerForm.value.email ? this.registerForm.value.email.toString() : '';
        let password = this.registerForm.value.password ? this.registerForm.value.password.toString() : '';
        this.auth.register(email, password)
            .pipe(finalize(() => (this.isSubmitted = false)))
            .subscribe(
                () => {
                  this.newActivity();
                  this.router.navigate([returnUrl]);
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

newActivity(): void{
  let activityDetails: any;
  const accessToken = localStorage.getItem('access_token')!;
  const tokenPayload:any = decode(accessToken);
  activityDetails = {
    client_id: tokenPayload.id,
    title: 'New Users',
    description: 'User Registered <b>' + tokenPayload.email + '</b>',
    type: 'Users',
    name: tokenPayload.email,
    };
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



  togglePass(e: any): void{
    e.stopImmediatePropagation();
    e.preventDefault();
    this.hidePass = !this.hidePass
  }


  toggleCPass(e: any): void{
    e.stopImmediatePropagation();
    e.preventDefault();
    this.hideConPass = !this.hideConPass
  }

  get errorControl(): any {
    return this.registerForm.controls;
  }

}
function matchValidator(
  control: AbstractControl,
  controlTwo: AbstractControl
): ValidatorFn {
  return () => {
    if (control.value !== controlTwo.value)
      return { match_error: 'Password does not match' };
    return null;
  };
}


