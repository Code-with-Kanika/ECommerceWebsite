import {HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'; 
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductComponent } from './product/product.component';
import { EcommApiServiceService } from './ecomm-api-service.service';
import { ItemFilterPipe } from './pipes/item-filter.pipe';
import { UserLoginComponent } from './Login/user-login/user-login.component';
import { UserRegisterComponent } from './Login/user-register/user-register.component';
import { ConfirmEqualValidatorDirective } from './Shared/confirm-equal-validator.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from './Login/user-login/forgot-password/forgot-password.component';
import { CartComponent } from './cart/cart.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UserProfileComponent } from './Login/user-profile/user-profile.component';
import { ThankyouComponent } from './cart/thankyou/thankyou.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductProfileComponent } from './product/product-profile/product-profile.component';
import { AddressComponent } from './address/address.component';
import { UploadComponent } from './product/upload/upload.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    ProductComponent,
    ItemFilterPipe,
    UserLoginComponent,
    UserRegisterComponent,
    ConfirmEqualValidatorDirective,
    ForgotPasswordComponent,
    CartComponent,
    FilterPipe,
    UserProfileComponent,
    ThankyouComponent,
    EditProductComponent,
    ProductProfileComponent,
    AddressComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [EcommApiServiceService,{provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
