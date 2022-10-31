import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    const elementList = document.querySelectorAll('.header');
    const element = elementList[0] as HTMLElement;
    element.classList.add('shadow-head');
  }

  ngOnInit(): void {
  }

}
