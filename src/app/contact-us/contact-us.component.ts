import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  enquiry = [{'value':1,'viewValue':"Inquiry - new customer"},
              {'value':2,'viewValue':"Inquiry - member"},
              {'value':3,'viewValue':"Inquiry - not a customer"},
              {'value':4,'viewValue':"Billing"},
              {'value':5,'viewValue':"Merchandising"}]
  constructor() { }

  ngOnInit(): void {
  }

}
