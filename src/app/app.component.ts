import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EcommApiServiceService } from './ecomm-api-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Ecomm-Api';
  public searchTerm: string="";
  public totalItem:Number = 0;
  public username!: string;
  FilterList:any=[];
  

  constructor(private service:EcommApiServiceService,private _router:Router) { }

  ngOnInit(): void {
    this.service.cartNumber.asObservable().subscribe(res =>{
      this.totalItem=res;
    });
    
    this.service.username.asObservable().subscribe(res =>{
        this.username=res;
      });
  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    this.service.search.next(this.searchTerm);
  }
  onLogout(){
    localStorage.removeItem('token');
    this.service.username.next("Guest");
    this.service.RemoveAllCart();
    console.log(localStorage.getItem('token'));
    //for onit to work:
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/Products']);
  }

}

// this.service.searchTerm=this.searchTerm;
//this.service.GetProductList().subscribe(res => {
//  this.FilterList= res 
  //currentVal="";
  //eval(event : Event){
  //  this.currentVal=(event.target as HTMLInputElement).value;
  //}
  
