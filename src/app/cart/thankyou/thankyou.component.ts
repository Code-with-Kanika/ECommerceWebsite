import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import { ToWords } from 'to-words';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  
  toWords = new ToWords();
  public amountInWords!:String;
  public orderid!:Number;
  public grand!:number;
  todayDate = new Date();
  public user:any;
  public products:any=[];

  constructor(private service:EcommApiServiceService,private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.orderid=this.service.orderId.value;
    this.products=this.service.cartItemList;
    this.grand=this.service.GetTotalPrice();
    this.amountInWords = this.toWords.convert(this.grand);
    var t =localStorage.getItem('token');
    var tokenPayload=this.jwtHelper.decodeToken(t!);
    this.service.GetUserByMail(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']).subscribe(res =>{
      this.user=res;
      //console.log("USER IN THANK U PAGE")
      //console.log(this.user);
      this.service.cartItem.next(0);
      this.service.RemoveAllCart();
  })
    
   
  }

}
