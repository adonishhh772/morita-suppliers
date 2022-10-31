import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeliveryComponent>) { }

  ngOnInit(): void {
  }


  closeDialog(): void{
    this.dialogRef.close();
  }


}
