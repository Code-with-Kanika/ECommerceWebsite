import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EcommApiServiceService } from '../ecomm-api-service.service';
import { Order} from '../Models/order.model';
import { OrderProduct } from '../Models/OrderProduct.model';
import { Product } from '../Models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products:any=[];
  public grandTotal!:number; 
  public orderproduct:any;
  public obj:any;

  ord:Order={
    userId:0,
    totalAmount:0,
  }
  ordprod:OrderProduct={
    orderId:0,
    productId:0,
    orderQuantity:1
  }
  prod:Product={
    productName :"",
    productPrice: 0,
    category: "",
    description: "",
    productImg: "",
    quantityLeft :0,
    isDeleted:false
  }
  prodany:any;
  a:number=0;
  constructor(private service:EcommApiServiceService,
    private _router:Router,
    private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.service.GetProducts().subscribe(res =>{
      this.products=res;
      this.grandTotal=this.service.GetTotalPrice();
    })
  }
  
  public createImgPath=(serverPath:string) =>{
    return  `https://localhost:7060/Resources/Images/${serverPath}`;
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
      this.service.cartNumber.next(this.service.cartItem.value);
      console.log(this.a);
    }
   prodany.total=prodany.productPrice*prodany.quantity;
   this.grandTotal=this.service.GetTotalPrice();
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
    this.service.cartNumber.next(this.service.cartItem.value);
    }
    prodany.total=prodany.productPrice*prodany.quantity;
    this.grandTotal=this.service.GetTotalPrice();
  }
  removeItem(item:any){
    this.service.cartItem.subscribe(res =>{
      this.a = res;
      this.a=this.a - item.quantity;
    })
    this.service.cartItem.next(this.a);
    this.service.cartNumber.next(this.service.cartItem.value);
    this.service.RemoveCartItem(item);
  }
  emptyCart(){
    this.service.cartItem.next(0);
    this.service.cartNumber.next(this.service.cartItem.value);
    this.service.RemoveAllCart();
  }
  Checkout(){
    if(localStorage.getItem('token') == null){
      this._router.navigate(['Login/user-login']);
    }else{
      this._router.navigate(['address']);
      //console.log(this.service.productList.value);
      /*this.ord.totalAmount=this.service.GetTotalPrice();
      var t =localStorage.getItem('token');
      var tokenPayload=this.jwtHelper.decodeToken(t!);
      this.service.GetUserByMail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']).subscribe(res =>{
        //this.obj=res;
        this.ord.userId=res[0].userId;
        this.service.AddOrder(this.ord).subscribe(rs => {
          this.obj=rs; // OrderID
          this.service.orderId.next(this.obj.orderId);
          this.service.productList.subscribe(rd=>{
            this.orderproduct=rd; // All Cart Products
            for(var item in this.orderproduct){
              this.ordprod.orderId=this.obj.orderId; 
              this.ordprod.productId=this.orderproduct[item].productId;
              this.ordprod.orderQuantity=this.orderproduct[item].quantity;
              this.service.AddOrderProduct(this.ordprod).subscribe(rd =>{
                this.obj=rd;
                console.log(this.obj.orderProductId);
              }); 
              this.service.UpdateQuantity(this.orderproduct[item].productId,this.orderproduct[item].quantity).subscribe(rd);
            }
          });
         // this._router.navigate(['address']);
          this._router.navigate(['/cart/thankyou']);
        });
      })
      console.log(this.ord);*/
    }
  }
}
/*this.service.GetUsername().subscribe(res =>{
  if(localStorage.getItem('token') == null && res== 'Guest'){
    this._router.navigate(['Login/user-login']);
  }
  else{
    this.service.productList.subscribe(res =>{i
      console.log(res);
      this.orderproduct=res;
      this.ord.totalAmount = this.grandTotal;
      var t =localStorage.getItem('token');
      var tokenPayload=this.jwtHelper.decodeToken(t!);
      this.service.GetUserByMail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']).subscribe(res =>{
        this.obj=res;
        this.ord.userId=this.obj[0].userId;
        console.log(this.ord);
        this.service.AddOrder(this.ord).subscribe(rs => {
          this.obj=rs;
          for(var item in this.orderproduct){
            this.ordprod.orderId=this.obj.orderId; 
            this.ordprod.productId=this.orderproduct[item].productId;
            this.ordprod.orderQuantity=this.orderproduct[item].quantity;
            console.log(this.ordprod);
            this.service.AddOrderProduct(this.ordprod).subscribe(rd =>{
              this.obj=rd;
              console.log(this.obj.orderProductId);
              //this.service.;.orderId.next(this.obj.orderId);
              this.service.UpdateQuantity(this.orderproduct[item].productId,this.orderproduct[item].quantity).subscribe(rd);
              this._router.navigate(['/cart/thankyou']);
            }); 
          }
        });
      });
    });
  }
})
} */
