import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, NavigationError, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'Myunistudy';
  icon = 'dashboard';
  text = 'Dashboard';
  menuIcon = 'close';
  branchName = localStorage.getItem('userBranch');
  branchId = '';
  searchText = '';
  hasClient = '';
  myStyles: any;
  panelOpenState = false;
  panelOpenStateOther = false;
  panelOpenStateTracker = false;
  column = 'col-md-4';
  show = '';
  openSearch = '';
  openLiApplication = false;
    openLiBranch = false;
    hasShrunk = false;
    hasMessage = false;
    menuTile = '';
    showResult = false;
    started = false;
    productCount = 0;
    contactCount = 0;
    reminderCount = 0;
    reminder: any[] = [];
    orderCount = 0;
    allMessages: any[] = [];
    tasksCount = 0;
    contacts: any[] = [];
    searchContacts: any[] = [];
    itemData: any[] = [];
    allChatData: any[] = [];
    active = '';
    errorMessage = '';
    branchCount = 0;
    profile: any = [];
    token = localStorage.getItem('access_token')!;
  isMiddleResolution = true;
  private readonly apiUrl = `${environment.apiUrl}`;
  menu = [{icon: 'dashboard', text: 'Dashboard'}, {icon: '', text: ''}];
  @ViewChild('taskMenuTrigger') taskTrigger!: MatMenuTrigger;
    @ViewChild('assigneeMenuTrigger') assignTrigger!: MatMenuTrigger;
    @ViewChild('reminderMenuTrigger') remindTrigger!: MatMenuTrigger;

  constructor(public route: ActivatedRoute,private auth: AuthService,
    private http:HttpClient,
    private router: Router, private renderer: Renderer2, private elRef: ElementRef) {
      this.router.navigate(['admin/dashboard']);
      this.router.events.subscribe(val => {
        if (val instanceof NavigationStart) {
            const finalUrl = val.url.split('?');
            this.started = true;
            switch (finalUrl[0]) {
                case '/admin':
                    const selectedAdmin = this.elRef.nativeElement.querySelector('.ad_dashboard');
                      if (selectedAdmin.nextSibling !== null) {
                          const el = this.elRef.nativeElement.querySelectorAll('.menu_item');
                          el.forEach((cl: any) => {
                              this.renderer.removeClass(cl, 'selected_side_nav');
                          });
                          this.renderer.addClass(selectedAdmin, 'selected_side_nav');
                          this.menu[0].text = 'Dashboard';
                          this.menu[0].icon = 'dashboard';
                          this.menu[1].text = '';
                          this.menu[1].icon = '';
                        }
                  break;
                case '/admin/customers/':
                    const selected = this.elRef.nativeElement.querySelector('.selected_side_nav').nextSibling;
                    if (selected.nextSibling !== null) {
                        const el = this.elRef.nativeElement.querySelectorAll('.menu_item');
                        el.forEach((cl: any) => {
                            this.renderer.removeClass(cl, 'selected_side_nav');
                        });
                        this.renderer.addClass(selected, 'selected_side_nav');
                        this.menu[0].text = 'Customers';
                        this.menu[0].icon = 'people';
                        this.menu[1].text = 'View All';
                        this.menu[1].icon = 'view_list';
                    }
                    break;
                case '/admin/products/':
                  const selectedP = this.elRef.nativeElement.querySelector('.view_products');
                    if (selectedP.nextSibling !== null) {
                        const el = this.elRef.nativeElement.querySelectorAll('.menu_item');
                        el.forEach((cl: any) => {
                            this.renderer.removeClass(cl, 'selected_side_nav');
                        });
                        this.renderer.addClass(selectedP, 'selected_side_nav');
                        this.menu[0].text = 'Products';
                        this.menu[0].icon = 'inventory';
                        this.menu[1].text = 'Dashboard';
                        this.menu[1].icon = 'dashboard';
                    }
                    break;
                case '/admin/products/add':
                    const selectedPAdd = this.elRef.nativeElement.querySelector('.add_products');
                    if (selectedPAdd.nextSibling !== null) {
                        const el = this.elRef.nativeElement.querySelectorAll('.menu_item');
                        el.forEach((cl: any) => {
                            this.renderer.removeClass(cl, 'selected_side_nav');
                        });
                        this.renderer.addClass(selectedPAdd, 'selected_side_nav');
                        this.menu[0].text = 'Products';
                        this.menu[0].icon = 'inventory';
                        this.menu[1].text = 'Add Product';
                        this.menu[1].icon = 'add_circle';
                    }
                    break;
                case '/admin/products/category':
                    const selectedCat = this.elRef.nativeElement.querySelector('.products_category');
                    const elem = this.elRef.nativeElement.querySelectorAll('.menu_item');
                    elem.forEach((cl: any) => {
                        this.renderer.removeClass(cl, 'selected_side_nav');
                    });
                    this.renderer.addClass(selectedCat, 'selected_side_nav');
                    this.menu[0].text = 'Products';
                    this.menu[0].icon = 'inventory';
                    this.menu[1].text = 'Category';
                    this.menu[1].icon = 'category';
                    break;
                case '/admin/orders':
                    const selectedOrders = this.elRef.nativeElement.querySelector('.view_orders');
                    const elemApplication = this.elRef.nativeElement.querySelectorAll('.menu_item');
                    elemApplication.forEach((cl: any) => {
                        this.renderer.removeClass(cl, 'selected_side_nav');
                    });
                    this.renderer.addClass(selectedOrders, 'selected_side_nav');
                    this.menu[0].text = 'Orders';
                    this.menu[0].icon = 'production_quantity_limits';
                    this.menu[1].text = 'Dashboard';
                    this.menu[1].icon = 'dashboard';
                    break;
                case '/admin/orders/tracking':
                    const selectedOT = this.elRef.nativeElement.querySelector('.track_orders');
                    const view = this.elRef.nativeElement.querySelectorAll('.menu_item');
                    view.forEach((cl: any) => {
                        this.renderer.removeClass(cl, 'selected_side_nav');
                    });
                    this.renderer.addClass(selectedOT, 'selected_side_nav');
                    this.menu[0].text = 'Orders';
                    this.menu[0].icon = 'production_quantity_limits';
                    this.menu[1].text = 'Tracking';
                    this.menu[1].icon = 'leaderboard';
                    break;
                    case '/admin/customers/view':
                        this.menu[0].text = 'Customers';
                        this.menu[0].icon = 'people';
                        this.menu[1].text = 'Customer';
                        this.menu[1].icon = 'remove_red_eye';
                        break;
           }
            // Show loading indicator
        }

        if (val instanceof NavigationEnd) {
            this.started = false;
            // Hide loading indicator
        }

        if (val instanceof NavigationError) {
            // Hide loading indicator

            // Present error to user
        }
    });
     }

  ngOnInit(): void {
    this.getContacts();
    this.getAllMessage();
    this.myStyles = {height: window.innerHeight + 'px'};
  }

  getAllMessage(){
    this.http.get<any>(this.apiUrl + 'message/',{headers:{'authorization': this.token}}).subscribe({
      next: data => {
        this.allMessages = data.data;
        this.allMessages.sort((a, b) => new Date(b.sent_date).getTime() - new Date(a.sent_date).getTime());
        if (this.allMessages.length > 0) {
          this.tasksCount = this.allMessages.length;
          this.hasMessage = true;
      }
      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
  }

  goToMessage(user_id:String): any{
    let chat = this.elRef.nativeElement.querySelectorAll('.dashboard-chart')[0] as HTMLElement;
    chat.scrollIntoView();
    this.router.navigate(['/dashboard']);
  }

  changeRoute(e: any, bTitle: string, bIcon: string, title: string, link: string, icon: string, id: any): any {
    const el = this.elRef.nativeElement.querySelectorAll('.menu_item');
    el.forEach((cl: any) => {
        this.renderer.removeClass(cl, 'selected_side_nav');
    });

    if (e.target.className !== 'menu_item') {
        this.menu[0].text = title;
        this.menu[0].icon = icon;
        this.menu[1].text = bTitle;
        this.menu[1].icon = bIcon;
    } else {
        this.menu[0].text = title;
        this.menu[0].icon = icon;
        this.menu[1].text = bTitle;
        this.menu[1].icon = bIcon;
    }

    if (e.target.className.includes('mat-list-item-content')) {
        if (e.target.offsetParent.offsetParent.className.includes('menu_item_accordian')) {
            this.menu[0].text = bTitle;
            this.menu[0].icon = bIcon;
            this.menu[1].text = title;
            this.menu[1].icon = icon;
        }
    } else {
        if (e.target.offsetParent.offsetParent.offsetParent.className.includes('menu_item_accordian')) {
            this.menu[0].text = bTitle;
            this.menu[0].icon = bIcon;
            this.menu[1].text = title;
            this.menu[1].icon = icon;

        }
    }


    if (e.target.className !== 'mat-list-item-content') {
        if (!e.target.parentElement.parentElement.className.includes('selected_side_nav')) {
            e.target.parentElement.parentElement.className += ' selected_side_nav';
        } else {
            e.target.parentElement.parentElement.className = e.target.parentElement.parentElement.className.replace(' selected_side_nav', '');
        }
    } else {
        if (!e.target.parentElement.className.includes('selected_side_nav')) {
            e.target.parentElement.className += ' selected_side_nav';
        } else {
            e.target.parentElement.className = e.target.parentElement.className.replace(' selected_side_nav', '');
        }
    }

    if (link !== '') {
        if (id === null) {
            this.router.navigateByUrl(link);
        } else {
            const navigationExtras: NavigationExtras = {
                queryParams: {id: id}
            };
            this.router.navigate([link], navigationExtras);
        }

    }


}

getContacts(): any {
  this.http.get<any>(this.apiUrl + 'users/',{headers:{'authorization': this.token}}).subscribe({
      next: data => {
              this.contactCount = data.data.filter((contact: any) => {
                  return (contact.role === 'users');
              }).length;

      },
      error: error => {
          this.errorMessage = error.message;
      }
  });
}



toggleNav(drawer: any): any {

  }

  navigateToContact(clientId: string, type: string): any {


}


navigateToView(nav: string): any {

}

searchTrigger(): void {

}

openMail():void{


}

closeSearch():void{

}

toggleSearchBar():void{

}

openAssignee():void{

}

toggleBadgeVisibility():void{

}

toggleProfile():void{

}

searchClient(event: any){

}


logout(){
  this.auth.logout();
  this.router.navigate(['/']);
}

}
