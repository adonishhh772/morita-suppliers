import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;
  value = 0;
  constructor() { }
  @Output() event = new EventEmitter<number>();
  ngOnInit(): void {
  }
  onChangeTypes(event: any, types: any) {
    if (types === "Mattress") {
      this.value = event.source.value;
      this.event.emit(this.value);
      console.log(this.value);
    }
    else if (types === "Sofas") {
      this.value = event.source.value;
      this.event.emit(this.value);
    }
  }
}
