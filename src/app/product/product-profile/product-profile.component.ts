import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';

@Component({
  selector: 'app-product-profile',
  templateUrl: './product-profile.component.html',
  styleUrls: ['./product-profile.component.css']
})
export class ProductProfileComponent implements OnInit {

  constructor(private service:EcommApiServiceService,private _router:Router) { }

  product:any;
  public grandTotal!:number;
  a:number=0;

  ngOnInit(): void {
    this.product=this.service.productProfile.value;
  }
  public createImgPath=(serverPath:string) =>{
    return  `https://localhost:7060/Resources/Images/${serverPath}`;
  }
  AdtoCart(prod:any){
    this.service.Addtocart(prod);
    this._router.navigate(['/cart']);
  }
  plus(prodany:any)
  {
   if(prodany.quantity < prodany.quantityLeft ) {
      prodany.quantity = prodany.quantity + 1;
      this.service.cartItem.subscribe(res =>{
        this.a = res;
        this.a = this.a +1;
      });
      this.service.cartItem.next(this.a);
      console.log(this.a);
    }
   prodany.total=prodany.productPrice*prodany.quantity;
  }
  minus(prodany:any)
  {
    if(prodany.quantity > 1){
    prodany.quantity = prodany.quantity-1;
    this.service.cartItem.subscribe(res =>{
      this.a = res;
      this.a = this.a - 1;
    });
    console.log(this.a);
    this.service.cartItem.next(this.a);
    }
    prodany.total=prodany.productPrice*prodany.quantity;
  }
  
}
