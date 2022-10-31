import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit,AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elementList = document.querySelectorAll('.header');
    const element = elementList[0] as HTMLElement;
    element.classList.add('shadow-head');
  }

}
