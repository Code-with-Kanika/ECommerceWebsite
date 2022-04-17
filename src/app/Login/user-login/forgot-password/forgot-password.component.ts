import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import { UserUse } from 'src/app/Models/useruse.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email="";
  public userpost:UserUse[]=[];
  constructor(private service:EcommApiServiceService,private _router: Router) { }

  ngOnInit(): void {
  }
  userForgotPassword(LoginForm : NgForm){
    this.service.GetUserByMail(LoginForm.value.email).subscribe(res =>{
      this.userpost = res as []
    });
    if(this.userpost[0].emailId == LoginForm.value.email){
      //Logic to authenticate user and then create a new password for them.

    }else{
      alert("User DNE!!");
      this._router.navigate(['Login/user-register']);
    }
  }
}
