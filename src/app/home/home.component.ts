import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected = 'Recommended';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToDetails(navigation: string, detail: string){
    this.router.navigateByUrl(navigation+'?product='+detail);
  }

}
