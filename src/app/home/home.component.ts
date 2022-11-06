import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected = 'Recommended';
  message = "";
  panelOpenState: any;
  refineBtn: any
  constructor(private router: Router, private elf: ElementRef) { }

  ngOnInit(): void {
  }

  goToDetails(navigation: string, detail: string) {
    this.router.navigateByUrl(navigation + '?product=' + detail);
  }

  receiveMessage(event: any) {
    this.message = event;
  }
  onClickRefine(event: any) {
    this.refineBtn = this.elf.nativeElement.querySelector('.refine-inner');
    this.refineBtn.classList.add('showInnerPanel');
  }
  onCancel(event: any) {
    this.refineBtn.classList.add('hideInnerPanel');
    this.refineBtn.classList.remove('showInnerPanel');
  }
}
