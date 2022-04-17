import { Component, OnInit } from '@angular/core';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import { UserUse } from 'src/app/Models/useruse.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails:any;
  orderDetails:any;
  public userpost:UserUse[]=[];
  emailId="";

  constructor(private service:EcommApiServiceService) { }

  ngOnInit(): void {
    this.service.GetUserProfile().subscribe(res =>{
      this.userDetails=res;
      console.log(this.userDetails[0].userId);
      this.service.GetOrderByUserId(this.userDetails[0].userId).subscribe(rs =>{
        this.orderDetails=rs;
        console.log(this.orderDetails.length);
      })
    })
  }

}
