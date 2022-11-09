import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeliveryComponent } from '../delivery/delivery.component';
import decode from 'jwt-decode';
import { AuthService } from 'src/app/Services/auth.service';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  accountClass: String = "col-md-2 hideShowMenuItems";

  toggle: any;
  headerClassWhyUs: String = "header-subheader-collapsed";
  headerClassAccount: String = "header-subheader-collapsed";
  globalListenMouseInFunc: Function = new Function();
  currentPosition = window.pageYOffset;
  hasShadow = '';
  whyUs = [{ 'title': 'How it works', 'image': './assets/how-it-works.jpg', 'navigate': 'how-it-works' },
  { 'title': 'About us', 'image': './assets/about-us.jpeg', 'navigate': 'about-us' },
  { 'title': 'Reviews', 'image': './assets/reviews.jpeg', 'navigate': 'reviews' }]
  constructor(private renderer: Renderer2, private auth: AuthService,
    private router: Router, private elRef: ElementRef, public dialog: MatDialog, private snackbar: MatSnackBar) { }

  ngOnInit() {
    const heading = this.elRef.nativeElement.querySelector('.header');
    const subheading = this.elRef.nativeElement.querySelectorAll('.subheading');
    this.globalListenMouseInFunc = this.renderer.listen(heading, 'mousemove', e => {
      if (e.target.classList.contains('why-us')) {
        this.headerClassWhyUs = "header-subheader-expanded";
        this.headerClassAccount = "header-subheader-collapsed";
      } else if (e.target.classList.contains('account')) {
        this.headerClassWhyUs = "header-subheader-collapsed";
        this.headerClassAccount = "header-subheader-expanded";
      }
    });
    subheading.forEach((cl: any) => {
      this.renderer.listen(cl, 'mouseleave', e => {
        this.headerClassWhyUs = "header-subheader-collapsed";
        this.headerClassAccount = "header-subheader-collapsed";
      });

      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        this.isLoggedIn = true;
        const tokenPayload: any = decode(accessToken);
        if (tokenPayload.role == 'admin') {
          this.isAdmin = true;
        } else {
          this.accountClass = "col-md-2S";
        }
      }

    });




  }

  goToNav(navigation: string) {
    this.router.navigateByUrl(navigation);
    this.headerClassWhyUs = "header-subheader-collapsed";
    this.headerClassAccount = "header-subheader-collapsed";

  }

  openDelivery(): void {
    const dialogRef = this.dialog.open(DeliveryComponent, { panelClass: 'custom-modalbox', disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy() {
    // remove listener
    this.globalListenMouseInFunc();

  }

  @HostListener('window:scroll', ['$event.target'])
  onWindowScroll($event: any) {
    if (this.router.url == '/') {
      let scroll = $event.scrollingElement.scrollTop;
      if (scroll > this.currentPosition) {
        this.hasShadow = 'shadow-head'
      } else {
        this.hasShadow = '';
      }
    }

  }

  logout(): void {
  
    this.auth.logout();
    this.router.navigate(['/']);
  }

  toggleMenu(params: any): void {
    if (params === 'menu') {
      this.toggle = this.elRef.nativeElement.querySelector(".outer-wrapper");
      this.toggle.classList.toggle("show-wrapper");
    }

  }
  onCancelMenu(params: any): void {
    if (params === 'cancel') {
      this.toggle.classList.remove("show-wrapper");
    }

  }
}
