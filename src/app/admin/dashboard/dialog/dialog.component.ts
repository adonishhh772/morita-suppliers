import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  client_id: string;
  client_name: string;
  title: string;
  stars: number;
  description:string;
  created_date: Date;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  stars:any[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      for(let i = 0; i < this.data.stars;i++){
        this.stars.push(i);
      }
   }

  ngOnInit(): void {
  }

}
