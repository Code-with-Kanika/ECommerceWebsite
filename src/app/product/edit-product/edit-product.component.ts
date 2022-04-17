import { Component, Input, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor( private fb: FormBuilder,
    private modalService: NgbModal,
    private service:EcommApiServiceService,
    private _router:Router,
    private jwtHelper: JwtHelperService) { }

  editProfileForm!:FormGroup;

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      productId:0,
      productName: "",
      productPrice:0,
      description:"",
      category:"",
      productImg:"",
      quantityLeft:0
     });
  }
  displayStyle = "none";
  openPopupEdit(prod:any) {
    this.displayStyle = "block";
  
    this.editProfileForm.patchValue({
      productId:prod.productId,
      productName: prod.productName,
      productPrice:prod.productPrice,
      description:prod.description,
      category:prod.category,
      productImg:prod.productImg,
      quantityLeft:prod.quantityLeft
    });
  }
  closePopupEdit() {
    this.displayStyle = "none";
    //console.log("res:", this.editProfileForm.getRawValue());
  }
  onSubmitEdit() {
    this.displayStyle = "none";
    console.log("res:", this.editProfileForm.getRawValue());
    console.log("res1:", this.editProfileForm.getRawValue().productId);
    //this.service.UpdateProduct(1,this.editProfileForm.getRawValue());
  }
}