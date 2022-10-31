import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  links = ['Order Dashboard', 'Order Tracker'];
  activeLink = this.links[0];
  newOrders: any[] = [];
  allReceived: any[] = [];
  recievedToday = 0;
  recievedWeek = 0;
  dispatched: any[] = [];
  dispatchedToday = 0;
  dispatchedWeek = 0;
  allOrders: any[] = [];
  ordersToday = 0;
  ordersWeek = 0;
  allConfirmed: any[] = [];
  confirmedToday = 0;
  confirmedWeek = 0;
  constructor( private router: Router,) {
    if (this.router.url === '/admin/orders/tracking') {
      this.activeLink = this.links[1];
  } else {
      this.activeLink = this.links[0];
  }
  }

  ngOnInit(): void {
  }

  changeTab(link: string): void {
    this.activeLink = link;

    if (link === this.links[1]) {
        this.router.navigate(['admin/orders/tracking']);
    } else {
        this.router.navigate(['admin/orders']);
    }
}

}
