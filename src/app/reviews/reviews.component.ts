import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ReviewsService } from '../Services/reviews.service';
import decode from 'jwt-decode';
import { ActivityService } from '../Services/activity.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  hidden = 'hidden';
  hasReview = false;
  isSubmitted = false;
  reviewCount = 0;
  error = '';
  isLogged = true;
  isDisbled = false;
  token = localStorage.getItem('access_token')!;
  stars = [{'icons':'star_border'},{'icons':'star_border'},{'icons':'star_border'},{'icons':'star_border'},{'icons':'star_border'}  ];
  allReviews:any[] = [];
  reviewForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  constructor(private renderer: Renderer2,
    private elRef: ElementRef,
    private auth: AuthService,
    private router: Router,
    private activityService: ActivityService,
    private _snackBar: MatSnackBar,
     private reviewService:ReviewsService) {}

  ngOnInit(): void {

    if (!this.token) {
      this.isLogged = false;
    }else{
      const accessToken:any = decode(this.token);
      if(accessToken.role == 'admin'){
        this.isDisbled = true;
      }
    }

    this.getAllReviews();
  }

  trimString(text:String, length:any) {
    return text.length > length ?
           text.substring(0, length) + '...' :
           text;
}

postReview():any{
  this.isSubmitted = true;
  if ((!this.loginForm.valid && !this.isLogged) || !this.reviewForm.valid ) {
    return false;
  } else {
    if(!this.isLogged){
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
                    this.auth.logout();
                    this._snackBar.open('Cannot post a review', '', {
                      duration: 3000,
                    })
                  }else{

                      const reviewDetails = {
                        title: this.reviewForm.value.title? this.reviewForm.value.title.toString(): '',
                        description: this.reviewForm.value.description? this.reviewForm.value.description.toString(): '',
                        client_id : tokenPayload.id,
                        client_name : tokenPayload.name?tokenPayload.name:email,
                        stars: this.elRef.nativeElement.querySelectorAll('.clicked_rate').length
                      }

                      this.addReview(reviewDetails);
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

                  }
              }
          );
    }else{
      const tokenPayload:any = decode(this.token);
      if(tokenPayload.blacklisted){
        this.auth.logout();
        this._snackBar.open('Your profile has been blacklisted. Please contact your admin for further information', 'Contact Us', {
          duration: 3000,
        }).onAction()
        .subscribe(() => this.router.navigateByUrl('/contact-us'));;
      }else{
        const reviewDetails = {
          title: this.reviewForm.value.title? this.reviewForm.value.title.toString(): '',
          description: this.reviewForm.value.description? this.reviewForm.value.description.toString(): '',
          client_id : tokenPayload.id,
          client_name : tokenPayload.name?tokenPayload.name:tokenPayload.email,
          stars: this.elRef.nativeElement.querySelectorAll('.clicked_rate').length
        }


        this.addReview(reviewDetails);
      }

    }

    return true;
}
}

addReview(details:any):any{
  this.reviewService.add(details).pipe(finalize(() => {})).subscribe(
    (result) => {
      this._snackBar.open(result.message, '', {
        duration: 2000,
    });
    this.reviewForm.reset();
    this.loginForm.reset();
    this.hidden = 'hidden';
    this.newActivity();
    this.getAllReviews();

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

newActivity(): void{
  let activityDetails: any;
  const accessToken = localStorage.getItem('access_token')!;
  const tokenPayload:any = decode(accessToken);
  const uName = tokenPayload.name?tokenPayload.name:tokenPayload.email;
  activityDetails = {
    client_id: tokenPayload.id,
    title: 'New Review',
    description: 'User <b>' + uName + '</b> posted a new review',
    type: 'Users',
    name: uName,
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


getAllReviews():void{
  this.reviewService.getAllReviews().pipe(finalize(() => {})).subscribe(
    (result) => {
      this.allReviews = result.data;
      this.allReviews.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
      if (this.allReviews.length > 0) {
        this.hasReview = true;
    }

    this.reviewCount = this.allReviews.length;
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

openReviewBox(): void {
  this.hidden = 'visible';
  const rate = this.elRef.nativeElement.querySelectorAll('.rating_icon');
  const rating_div = this.elRef.nativeElement.querySelector('.review-icons-list');

  rate.forEach((cl: any, index: number) => {
    this.renderer.listen(cl, 'mouseenter', e => {
      for(let i = 0; i <= index;i++){
        this.stars[i].icons = "star_rate";
        rate[i].classList.add('rate_icon');
      }
    });

    this.renderer.listen(cl, 'click', e => {
      rate.forEach((cl: any, index: number) => {
        cl.classList.remove('rate_icon');
        this.stars[index].icons = "star_border";
        cl.classList.remove('clicked_rate');
        });
      for(let i = 0; i <= index;i++){
        this.stars[i].icons = "star_rate";
        rate[i].classList.add('rate_icon');
        rate[i].classList.add('clicked_rate');
      }
     });

    this.renderer.listen(cl, 'mouseleave', e => {
     if(e.offsetX < 0){
      //  console.log(cl.classList.contains('clicked_rate'));
       if(!cl.classList.contains('clicked_rate')){
        this.stars[index].icons = "star_border";
        cl.classList.remove('rate_icon');
       }

     }
    });
  });
  this.renderer.listen(rating_div, 'mouseleave', e => {
    rate.forEach((cl: any, index: number) => {
      if(!cl.classList.contains('clicked_rate')){
        this.stars[index].icons = "star_border";
        cl.classList.remove('rate_icon');
      }
    });
  });

}

get errorControl(): any {
  return this.reviewForm.controls;
}

get errorControlLogin(): any{
  return this.loginForm.controls;
}


}
