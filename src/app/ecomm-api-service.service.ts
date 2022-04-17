import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommApiServiceService {
  searchTerm!: string;
  public username = new BehaviorSubject<string>("Guest");
  public orderId = new BehaviorSubject<Number>(0);
  public token = new BehaviorSubject<string>("");
  public productProfile:any=new BehaviorSubject<any>([]);
  constructor(private http:HttpClient ) { }

  public search=new BehaviorSubject<String>("");

  SetUsername(t:string): void{
    this.username.next(t);
  }
  GetUsername(){
    return this.username.value;
  }
  SetToken(t:string): void{
    this.token.next(t);
  }
  GetToken(){
    return this.token.asObservable();
  }
  GetorderId(){
    return this.orderId.value;
  }

  //Cart
  public cartItemList:any=[];
  public value:number=0;
  public cartNumber=new BehaviorSubject<number>(0);
  public cartItem = new BehaviorSubject<number>(0);
  public productList = new BehaviorSubject<any>([]);

  GetProducts(){
    return this.productList.asObservable();
  }

  SetProducts(product:any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  CheckAndUpdate(product:any){
    return this.cartItemList.some(function(e1:any){
      return e1.productId === product.productId
    })
  }

  FindIndex(product:any){
    var index = this.cartItemList.findIndex(function(el:any) {
      return el.productId == product.productId;
    });
    return index;
  }
  objIndex:any;
  Addtocart(product:any){
   this.objIndex=this.CheckAndUpdate(product);
    if(this.objIndex == false){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    }else{
      var i = this.FindIndex(product);
      this.cartItemList[i].quantity = this.cartItemList[i].quantity + product.quantity;
      this.cartItemList[i].total = this.cartItemList[i].quantity * this.cartItemList[i].productPrice;
    }
    this.GetTotalPrice();
    this.cartItem.next(this.cartItem.value + 1);
    this.cartNumber.next(this.cartItem.value);
    
  }

  GetTotalPrice(): number{
    let grandtotal=0;
    this.cartItemList.map((a:any)=>{
      grandtotal += a.total;
    })
    return grandtotal;
  }

  RemoveCartItem(product:any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product.productId === a.productId){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  RemoveAllCart(){
    this.cartItemList=[];
    this.productList.next(this.cartItemList);
    this.cartItem.next(0);
    this.cartNumber.next(0);
  }

  readonly APIUrl="https://localhost:7060/api";

  //Address

  GetCountry(){
    return this.http.get<any>(this.APIUrl + '/Country').pipe(
      catchError(this.handleError));
  }
  GetState(countryid:number):Observable<any>{
    return this.http.get<any>(this.APIUrl + '/States/' +countryid).pipe(
      catchError(this.handleError));
  }
  GetCity(stateid:number):Observable<any>{
    return this.http.get<any>(this.APIUrl + '/City/' +stateid).pipe(
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
  //Users
  GetUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Users');
  }
  AddUser(data:any){
    const httpOptions = { headers : new HttpHeaders ( {'Content-Type':'application/json'})  };
    return this.http.post(this.APIUrl + '/Users',data,httpOptions);
    //.pipe(map(response => response),catchError(this.handleError));
  }
  UpdateUser(id:number,data:any){
  return this.http.put(this.APIUrl+ '/Users/${id}',data);
  }
  DeleteUser(id:number){
  return this.http.delete(this.APIUrl+'/Users/${id}');
  }
  GetUserByMail(mail:any):Observable<any>{
  return this.http.get<any>(this.APIUrl + '/Users/' +mail);
  }
  CheckLogin(Login:any):Observable<any>{
    return this.http.get<any>(this.APIUrl+ '/Users/Login',{params:Login});
  }
  GetUserProfile(){
    var tokenheader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    return this.http.get(this.APIUrl+'/Users/UserProfile',{headers : tokenheader});
  }
  UpdateMobileAndAddress(User:any):Observable<any>{
    return this.http.get<any>(this.APIUrl+ '/Users/User',{params:User});
  }

  //Product
  GetProductList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Products');
  }
  AddProduct(data:any){
    //var tokenheader=new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')});
    //return this. http.post(this.APIUrl + '/Products',data,{headers : tokenheader});
    return this. http.post(this.APIUrl + '/Products',data);
  }
  UpdateProduct(id:number,data:any){
    return this.http.put(this.APIUrl+ '/Products/'+id,data);
  }
  UpdateQuantity(id:number,quantity:number){
    //console.log("kjah");
    return this.http.put(this.APIUrl+ '/Products/update/'+id,quantity);
  }
  DeleteProduct(id:number){
    return this.http.delete(this.APIUrl+'/Products/${id}');
  }
  DeleteviaUpdate(id:number){
    return this.http.put(this.APIUrl+ '/Products/deleteviaupdate/'+id,id);
  }

  //Orders
  GetOrderList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Orders');
  }
  AddOrder(data:any){
    return this. http.post(this.APIUrl + '/Orders',data);
  }
  UpdateOrder(id:number,data:any){
    return this.http.put(this.APIUrl+ '/Orders/${id}',data);
  }
  DeleteOrder(id:number){
    return this.http.delete(this.APIUrl+'/Orders/${id}');
  }
  GetOrderByUserId(id:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Orders/getbyuserid/'+id);
  }


  //OrderProduct
  GetOrderProductList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/OrderProducts');
  }
  AddOrderProduct(data:any){
    return this. http.post(this.APIUrl + '/OrderProducts',data); 
  }
  UpdateOrderProduct(id:number|string,data:any){
    return this.http.put(this.APIUrl+ '/OrderProducts/${id}',data);
  }
  DeleteOrderProduct(id:number|string){
      return this.http.delete(this.APIUrl+'/OrderProducts/${id}');
  }    
}
