import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isEmpty = false;
  isChecked = false;
  constructor() { }

  ngOnInit(): void {
  }

  setChecked(checked: boolean){
    this.isChecked = checked;
  }

}
