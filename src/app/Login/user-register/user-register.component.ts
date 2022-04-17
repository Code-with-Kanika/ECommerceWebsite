import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import { User } from 'src/app/Models/user.model';
import { Router } from '@angular/router';
import { Product } from 'src/app/Models/product.model';
import { UserUse } from 'src/app/Models/useruse.model';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  
  user:User ={
    UserName:"",
    email:"",
    Password:"",
    ConfirmPassword:"",
    Role:"user",
    Address:"Address1",
    PhoneNumber:1234567
  }
  public userpost:UserUse[]=[];
  constructor(private service:EcommApiServiceService ,private _router: Router) { }
  ngOnInit(): void {
    
  }
  AdUser() : void{
      console.log(this.user);
      this.service.GetUserByMail(this.user.email).subscribe(res =>{
        this.userpost = res as []
      });
      if(this.userpost[0].emailId != this.user.email){
          var userput={
            emailId:this.user.email,
            userName:this.user.UserName,
            phoneNumber:this.user.PhoneNumber,
            address:this.user.Address,
            password:this.user.Password,
            role:this.user.Role
          }
          this.service.AddUser(userput).subscribe(res =>{
            console.log(res);
            var id = res
          });
          alert("User Added");
          this._router.navigate(['Products']);
          }
      else{
        alert("Email-ID already registered!!")
        this._router.navigate(['Login/user-login']);
      }
  }

}