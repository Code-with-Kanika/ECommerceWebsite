import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EcommApiServiceService } from '../ecomm-api-service.service';
import { Order } from '../Models/order.model';
import { OrderProduct } from '../Models/OrderProduct.model';
import { Product } from '../Models/product.model';
import swal from 'sweetalert2'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})


// CommonJS

export class AddressComponent implements OnInit {
  public products:any=[];
  public grandTotal!:number; 
  public orderproduct:any;
  public obj:any;
  
  UpdateUser={
    emailId:"",
    address:"",
    phonenumber:0,
    CityId:0
  }
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
  //a:number=0;
  //a:number=0;
  createAccountForm!: FormGroup;
  countries!: any;
  states!: any;
  cities!: any;
  mobilenumber=0;
  //address="";
  public address: string="";

  constructor( private fb: FormBuilder,private service:EcommApiServiceService,private _router:Router,private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.service.GetProducts().subscribe(res =>{
      this.products=res;
      this.grandTotal=this.service.GetTotalPrice();
    });

    this.service.GetCountry().subscribe(data => this.countries = data);
    this.createAccountForm = new FormGroup({
      country: new FormControl(""),
      state: new FormControl(""),
      city: new FormControl("")
    });
  }

  onChangeCountry(countryId:number) {
    if (countryId) {
      this.service.GetState(countryId).subscribe(
        data => {
          this.states = data;
          this.cities = null;
        }
      );
    } else {
      this.states = null;
      this.cities = null;
    }
  }

  onChangeState(stateId:number) {
    if (stateId) {
      this.service.GetCity(stateId).subscribe(
        data => this.cities = data
      );
    } else {
      this.cities = null;
    }
  }

  Add(){
    console.log(this.createAccountForm);
    console.log(this.address);
    console.log(this.mobilenumber);
    var t =localStorage.getItem('token');
    var tokenPayload=this.jwtHelper.decodeToken(t!);
    this.UpdateUser.emailId=tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
    this.UpdateUser.CityId= this.createAccountForm.value.city;
    this.UpdateUser.address=this.address;
    this.UpdateUser.phonenumber=this.mobilenumber;
    this.service.UpdateMobileAndAddress(this.UpdateUser).subscribe(res=>{
      console.log(res);
    })
    swal.fire({
      title: 'Do you want to confirm the Order?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'NO',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.ord.totalAmount=this.service.GetTotalPrice();
        var t =localStorage.getItem('token');
        var tokenPayload=this.jwtHelper.decodeToken(t!);
        this.service.GetUserByMail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']).subscribe(res =>{
          this.obj=res;
          this.ord.userId=res[0].userId;
        if(this.service.GetTotalPrice() != 0){
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
            this._router.navigate(['/cart/thankyou']);
          });
        }else{
          alert("Order Not Done");
        }
        })
        console.log(this.ord);
        swal.fire('Order Done!', '', 'success')
      } else if (result.isDenied) {
        swal.fire('Order not Done', '', 'info')
      }
    })
    /*this.ord.totalAmount=this.service.GetTotalPrice();
      var t =localStorage.getItem('token');
      var tokenPayload=this.jwtHelper.decodeToken(t!);
      this.service.GetUserByMail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']).subscribe(res =>{
        this.obj=res;
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
