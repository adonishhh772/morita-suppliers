import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  constructor(private http: HttpClient) { }

  title = 'Product Details';
  private readonly apiUrl = `${environment.apiUrl}`;
  errorMessage = '';
  isSubmitted = false;
  uploadedFiles: Array<File> = [];
  isProcessing = false;
  addProductsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    brand: new FormControl('',[Validators.required]),
    availability: new FormControl('', [Validators.required]),
    price: new FormControl('',[Validators.required]),
    logo: new FormControl('',[Validators.required]),
    discount: new FormControl('',[Validators.required]),
    voucher: new FormControl('',[Validators.required]),
    height: new FormControl('',[Validators.required]),
    width: new FormControl('',[Validators.required]),
    depth: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
});
categoryList:any[]  = [];



  ngOnInit(): void {
    this.getAllCat();
  }

  get errorControl(): any {
    return this.addProductsForm.controls;
  }

  addProducts(): any{

  }


  getAllCat(): any{
    const token = localStorage.getItem('access_token')!;
    this.http.get<any>(this.apiUrl + 'category/',{headers:{'authorization': token}})
    .subscribe({
        next: data => {
           this.categoryList = data.data;
        },
        error: error => {
            this.errorMessage = error.message;
        }
    });
  }

  fileChange(element: any): any {
    this.uploadedFiles = element.target.files;
}


}
