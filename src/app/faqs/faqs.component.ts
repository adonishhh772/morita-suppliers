import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const elementList = document.querySelectorAll('.header');
    const element = elementList[0] as HTMLElement;
    element.classList.add('shadow-head');


    const subHeader = document.querySelectorAll('.subheader_text');
    subHeader.forEach((cl:any) =>{
      const sub = cl as HTMLElement;
      sub.classList.remove('decorated');
    });

    const headerText = document.querySelectorAll('.faqs-text')
    headerText.forEach((cl: any) => {
      const headTxt = cl as HTMLElement;
      headTxt.classList.add('decorated');
      // this.renderer.removeClass(cl, 'selected_side_nav');
  });
  }

  scrollTo(className: string){
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    const y = element.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: 'smooth' })
  }


}
