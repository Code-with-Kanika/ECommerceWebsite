import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import { UserUse } from 'src/app/Models/useruse.model';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  emailId="";
  password="";
  expToken: any;
  tokenPayload: any;
  expirationDate: any;

  //List$!:Observable<any[]> ;

  //public userpost:UserUse[]=[];
  //public userpost:any;
  
  constructor(private _router:Router,private service:EcommApiServiceService,private jwtHelper: JwtHelperService) { }
  
  ngOnInit(): void {
    //localStorage.removeItem('token');
    if(localStorage.getItem('token') != null){
      var t =localStorage.getItem('token');
      this.tokenPayload=this.jwtHelper.decodeToken(t!);
      this.service.username.next(this.tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      console.log(this.service.username.value);
      this._router.navigateByUrl('/Products');
    }
    
  }
  
  userLogin(LoginForm : NgForm) : void{
    this.service.CheckLogin(LoginForm.value).subscribe((rs:any) => {
      this.expToken=rs.value;
      localStorage.setItem('token',rs.value);
      this.tokenPayload=this.jwtHelper.decodeToken(this.expToken);
      alert("Welcome "+this.tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      this.service.SetUsername(this.tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      this._router.navigateByUrl('/Products');
    }); 
  }
}
  
 /* userLogin(LoginForm : NgForm) : void{
    console.log(this.emailId);
    this.service.GetUserByMail(this.emailId).subscribe((res) => {
      this.userpost = res ;
      if(this.password == this.userpost[0].password){
        this.service.CheckLogin(LoginForm.value).subscribe((rs:any) => {
            localStorage.setItem('token',rs.value);
            alert("Welcome "+this.userpost[0].userName);
            //this.service.SetToken(rs.value);
            this.service.SetUsername(this.userpost[0].userName);
            this._router.navigate(['/Products']);
        });
      }else{
        alert("Invalid Credentials");
        this._router.navigate(['Login/user-login']);
      }
    });
  }
}*/


//this.userobj.token=rs.value;
            //this.userobj.ema=this.userpost[0].emailId;
            //this.userobj.name=this.userpost[0].userName;
            //localStorage.setItem('token',this.userobj.token);
            //localStorage.setItem('token',rs.value+this.userpost[0].emailId);

//console.log("###"+ this.service.GetUserByMail(LoginForm.value.email));
    //if(this.service.GetUserByMail(LoginForm.value.email)){
    //  alert("Login Successful");
    //  this._router.navigate(['Products']);
    //}else{
    // alert("Login UnSuccessful!!!!!!! Try Again.");
    // this._router.navigate(['Login/user-login']);
    //console.log("Response Starts Here???")
    //console.log("+++++++++"+res+"++++++++++++");
    // this._router.navigate(['Products']);
    /* userId:res.userId,
    userName:res.userName,
    emailId: res.emailId,
    password:res.password,
    role:res.role,
    address:res.address,
    phoneNumber:res.phoneNumber

    user:UserUse={
    userId:0,
    userName:"",
    emailId: this.email,
    password:this.pass,
    role:"",
    address:"",
    phoneNumber:0
  }
    */
    


