import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit, AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    const headerElemList = document.querySelectorAll('.header');
    const head = headerElemList[0] as HTMLElement;
    head.classList.add('shadow-head');

    const subHeader = document.querySelectorAll('.subheader_text');
    subHeader.forEach((cl:any) =>{
      const sub = cl as HTMLElement;
      sub.classList.remove('decorated');
    });

    const headerText = document.querySelectorAll('.how-it-works-text')
    headerText.forEach((cl: any) => {
      const headTxt = cl as HTMLElement;
      headTxt.classList.add('decorated');
      // this.renderer.removeClass(cl, 'selected_side_nav');
  });


  }

  ngOnInit(): void {

  }

}
