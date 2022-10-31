import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngAfterViewInit(): void {
    const elementList = document.querySelectorAll('.header');
    const element = elementList[0] as HTMLElement;
    element.classList.add('shadow-head');

    const subHeader = document.querySelectorAll('.subheader_text');
    subHeader.forEach((cl:any) =>{
      const sub = cl as HTMLElement;
      sub.classList.remove('decorated');
    });

    const headerText = document.querySelectorAll('.about-us-text')
    headerText.forEach((cl: any) => {
      const headTxt = cl as HTMLElement;
      headTxt.classList.add('decorated');
      // this.renderer.removeClass(cl, 'selected_side_nav');
  });
  }

  ngOnInit(): void {
  }

}
