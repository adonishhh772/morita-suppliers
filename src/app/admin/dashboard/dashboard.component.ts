import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  isToggled = false;
  isLoading = false;
  isLoadingReview = false;
  isMinimised = false;
  isToggledNew = false;
  isToggledLatest = false;
  isToggledChat = false;
  isMinimisedNew = false;
  isMinimisedReview = false;
  isMinisedChat = false;
  stars: any[] = [];
  minimise = "remove";
  minimiseNew = "remove";
  minimiseLatest = "remove";
  minimiseChat = "remove";
  errorMessage = "";
  hasActivity = false;
  hasReviews = false;
  allActivity: any[] = [];
  allReviews: any[] = [];
  allCustomers: any[] = [];
  isLoadingCustomers = false;
  hasCustomers = false;
  imgUrl = `${environment.imgUrl}`;
  token = localStorage.getItem('access_token')!;
  private readonly apiUrl = `${environment.apiUrl}`;
  constructor(private renderer: Renderer2,
    private matDialog: MatDialog,
    private router: Router,
    private elRef: ElementRef,
    private http: HttpClient) { }


  ngOnInit(): void {
    this.getAllActivity(false);
    this.getAllReviews(false);
    this.getNewCustomer(false);
  }

  getAllActivity(isLoader:boolean):void{
    this.http.get<any>(this.apiUrl + 'activity/',{headers:{'authorization': this.token}}).subscribe({
      next: data => {
        this.allActivity = data.data;
        this.allActivity.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
        if (this.allActivity.length > 0) {
          this.hasActivity = true;
      }

      if(isLoader){
        this.isLoading = false;
      }

      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
  }

  getNewCustomer(loader:boolean):void{
    this.http.get<any>(this.apiUrl + 'users/',{headers:{'authorization': this.token}}).subscribe({
      next: data => {
        this.allCustomers = data.data.filter((contact: any) => {
          return contact.role !== 'admin' && contact.completed;
      });
      this.allCustomers.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
        if (this.allCustomers.length > 0) {
          this.hasCustomers = true;
      }

      if(loader){
        this.isLoadingCustomers = false;
      }

      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
  }

  getAllReviews(loader:boolean):void{
    this.http.get<any>(this.apiUrl + 'review/').subscribe({
      next: data => {
        this.allReviews = data.data;
        this.allReviews.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
        this.allReviews.forEach((cl: any, index: any) => {
          for(let i = 0; i < cl.stars;i++){
              this.stars.push(i);
              this.allReviews[index].allStars = this.stars;
          }
          this.stars = [];
        });
        if (this.allReviews.length > 0) {
          this.hasReviews = true;
      }

      if(loader){
        this.isLoadingReview = false;
      }

      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
  }

  goToView(id: any): any {
    const navigationExtras: NavigationExtras = {
        queryParams: {id: id}
    };
    this.router.navigate(['admin/customers/view'], navigationExtras);
}


  openBox(id:string):void{
    this.http.get<any>(this.apiUrl + 'review/'+id,{headers:{'authorization': this.token}}).subscribe({
      next: data => {
            this.matDialog.open(DialogComponent, {width: '50%', data: data.data});
      },
      error: error => {
          this.errorMessage = error.message;
      }
  });


}


  toggleLatest(toggle:any, e: any):void{
    const listOptions = this.elRef.nativeElement.querySelector('.latest-options');
    switch(toggle){
      case 'open':
        this.isToggled = true;
        listOptions.classList.add('w-auto');
        break;
      case 'reload':
        this.isLoading= true;
        this.getAllActivity(true);
        break;
      case 'minimize':
        this.isMinimised = !this.isMinimised;
          // this.minimiseNew = "add";
        if(this.isMinimised){
          this.minimise = "add";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '0px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0px';
        }else{
          this.minimise = "remove";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '370px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0.25rem 0 0.25rem 0';
        }
         break;
      case 'close':
        listOptions.classList.remove('w-auto');
        this.isToggled = false;
        break;
    }
  }

  toggleActivity(toggle:any,e:any):void{
    const listOptions = this.elRef.nativeElement.querySelector('.activity-options');
    switch(toggle){
      case 'open':
        this.isToggledLatest = true;
        listOptions.classList.add('w-auto');
        break;
      case 'reload':
          this.isLoadingReview= true;
          this.getAllReviews(true);
          break;
      case 'minimize':
        this.isMinimisedReview = !this.isMinimisedReview;
          // this.minimiseNew = "add";
        if(this.isMinimisedReview){
          this.minimiseLatest = "add";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '0px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0px';
        }else{
          this.minimiseLatest = "remove";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '370px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0.25rem 0 0.25rem 0';
        }
         break;
      case 'close':
        listOptions.classList.remove('w-auto');
        this.isToggledLatest = false;
        break;
    }
  }

  toggleChat(toggle:any,e: any):void{
    const listOptions = this.elRef.nativeElement.querySelector('.chart-options');
    switch(toggle){
      case 'open':
        this.isToggledChat = true;
        listOptions.classList.add('w-auto');
        break;
      case 'minimize':
        this.isMinisedChat = !this.isMinisedChat;
        // this.minimiseNew = "add";
        if(this.isMinisedChat){
          this.minimiseChat = "add";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '0px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0px';
        }else{
          this.minimiseChat = "remove";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '370px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0.25rem 0 0.25rem 0';
        }
       break;
      case 'close':
        listOptions.classList.remove('w-auto');
        this.isToggledChat = false;
        break;
    }
  }

  toggleNew(toggle:any,e:any):void{
    const listOptions = this.elRef.nativeElement.querySelector('.new-customer-options');
    switch(toggle){
      case 'open':
        this.isToggledNew = true;
        listOptions.classList.add('w-auto');
        break;
      case 'reload':
          this.isLoadingCustomers= true;
          this.getNewCustomer(true);
          break;
      case 'minimize':
        this.isMinimisedNew = !this.isMinimisedNew;
        // this.minimiseNew = "add";
        if(this.isMinimisedNew){
          this.minimiseNew = "add";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '0px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0px';
        }else{
          this.minimiseNew = "remove";
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.maxHeight = '370px';
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.card-body').style.padding = '0.25rem 0 0.25rem 0';
        }
       break;
      case 'close':
        listOptions.classList.remove('w-auto');
        this.isToggledNew = false;
        break;
    }
  }

}
