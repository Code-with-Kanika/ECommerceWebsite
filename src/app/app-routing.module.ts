import { NgModule } from '@angular/core';
import {HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './Login/user-login/user-login.component';
import { UserRegisterComponent } from './Login/user-register/user-register.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { ForgotPasswordComponent } from './Login/user-login/forgot-password/forgot-password.component';
import { CartComponent } from './cart/cart.component';
import { UserProfileComponent } from './Login/user-profile/user-profile.component';
import { ThankyouComponent } from './cart/thankyou/thankyou.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductProfileComponent } from './product/product-profile/product-profile.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  {path: '', redirectTo:'/Products',pathMatch:'full'},
  {path:'Orders',component:OrdersComponent},
  {path:'Products',component:ProductComponent},
  {path:'Login/user-login',component:UserLoginComponent},
  {path:'Login/user-register',component:UserRegisterComponent},
  {path:'Login/user-login/Login/user-register',component:UserRegisterComponent},
  {path:'Login/user-login/Login/user-login/forgot-password',component:ForgotPasswordComponent},
  {path:'cart',component:CartComponent},
  {path:'Login/user-profile',component:UserProfileComponent},
  {path:'cart/thankyou',component:ThankyouComponent},
  {path:'Profile',component:EditProductComponent},
  {path:'products/product-profile',component:ProductProfileComponent},
  {path:'address',component:AddressComponent}
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
