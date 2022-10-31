import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliveryComponent } from '../Components/delivery/delivery.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  imageUrl = '';
  qtyProduct = 1;
  selectedColour = '';
  constructor(private renderer: Renderer2, private elRef: ElementRef,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.imageUrl = 'sofas-nobg.png';
    this.selectedColour = 'purple';
  }

  getImage(imgUrl:string, e:any):void{

  const imgCover = this.elRef.nativeElement.querySelectorAll('.img-cover');
    imgCover.forEach((cl: any) => {
      cl.classList.remove('selected');
    });

    if(e.target.classList.contains('img-cover')){
      e.target.classList.add('selected');
    }else{
      e.target.parentNode.parentNode.classList.add('selected');
    }

    this.imageUrl = imgUrl;
  }

  checkDelivery():void{
    const dialogRef = this.dialog.open(DeliveryComponent, {panelClass: 'custom-modalbox', disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeColors(colorChoice: string,e:any):void {
    const colorPalette = this.elRef.nativeElement.querySelectorAll('.color-pallete');
    colorPalette.forEach((cl: any) => {
      cl.classList.remove('selected');
    });

    if(e.target.classList.contains('color-pallete')){
      e.target.classList.add('selected');
    }else{
      e.target.parentNode.classList.add('selected');
    }

    this.selectedColour = colorChoice;
  }

}
