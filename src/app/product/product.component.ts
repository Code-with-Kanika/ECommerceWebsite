import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EcommApiServiceService } from 'src/app/ecomm-api-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {Product} from 'src/app/Models/product.model'
import { ProductNew } from '../Models/productnew.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  /* code can change*/
  public progress!: number;
  public message!: string;
  @Output() public onUploadFinished = new EventEmitter();
  //

  public Flist:any;
  public FilterList:any;
  searchKey:string="";
  public r:string="user";
  public proditem:any;
  editProfileForm!: FormGroup;
  createProfileForm!:FormGroup;

   Form :Product={
    productName: "",
    productPrice:0,
    description:"",
    category:"",
    productImg:"",
    quantityLeft:0,
    isDeleted:false
   }
   FormEdit:ProductNew = {
    productId:0,
    productName: "",
    productPrice:0,
    description:"",
    category:"",
    productImg:"",
    quantityLeft:0,
    isDeleted:false
   }
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private service:EcommApiServiceService,
    private _router:Router,
    private jwtHelper: JwtHelperService,private http: HttpClient) { }
    //fileName:any = "C:\\Users\\k.c.garg\\source\\repos\\ECommerceApp\\ECommerceBackend\\Resources\\Images\\";
    fileName:any;

  ngOnInit(): void {
    if(localStorage.getItem('token') != null){
      var t =localStorage.getItem('token');
      var tokenPayload=this.jwtHelper.decodeToken(t!);
       this.r = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      this.service.SetUsername(tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    }
    this.editProfileForm = this.fb.group({
      productId:0,
      productName: "",
      productPrice:0,
      description:"",
      category:"",
      productImg:"",
      quantityLeft:0
     });

     this.createProfileForm=this.fb.group({
      productName: "",
      productPrice:0,
      description:"",
      category:"",
      productImg:"",
      quantityLeft:0
     });

    this.service.GetProductList().subscribe(res => {
      this.FilterList= res;
      this.Flist=res;
      this.FilterList.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.productPrice});
    });
  });
  this.service.search.subscribe((val:any) =>{
    this.searchKey=val;
  })
  }


  public response!: { dbPath: '' }
  public uploadFinished = (event:any)=>{
    console.log("event");
    console.log(event);
    this.response=event;
  }
  
  public uploadFile = (files: any) => {
    this.fileName=this.fileName + files[0].name
    console.log("Started Here")
    console.log(this.fileName);
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('https://localhost:7060/api/Products/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });
  }
  public createImgPath=(serverPath:string) =>{
    return  `https://localhost:7060/Resources/Images/${serverPath}`;
  }

  filter(category:string){
    var c1="";
    this.Flist= this.FilterList.filter((a:any) =>{
      if(category === 'fashion'){
        if(a.category=='mens clothing' || a.category=='womens clothing'){
          return a;
        }
      }
      if(a.category==category || category==''){
        return a;
      }
    })

  }

  ProductProfile(item:any){
    var t =localStorage.getItem('token');
    var tokenPayload=this.jwtHelper.decodeToken(t!);
    console.log(tokenPayload);
    if((tokenPayload==null) || tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == 'user') {
    this.service.productProfile.next(item);
    this._router.navigateByUrl('products/product-profile');
    }
  }

  displayStyle = "none";
  displayStyleCreate="none";

  openPopupCreate(){
    this.displayStyleCreate = "block";
  }

  closePopupCreate() {
    this.displayStyleCreate = "none";
    //console.log("res:", this.editProfileForm.getRawValue());
  }
  
  
  //public response!: { dbPath: ''; };
 
  public onSubmitCreate = (files: any) =>{
    this.uploadFile(files);
    console.log("logged here")
    //console.log(this.response);
    //console.log(this.fileName);
   //this.createProfileForm.value.productImg = this.fileName;
    this.displayStyleCreate = "none";
    console.log(this.createProfileForm.value);
    this.Form.productName=this.createProfileForm.value.productName;
    this.Form.category=this.createProfileForm.value.category;
    this.Form.description=this.createProfileForm.value.description;
    this.Form.quantityLeft=this.createProfileForm.value.quantityLeft;
    this.Form.productPrice=this.createProfileForm.value.productPrice;
    //this.createForm.productImg=this.response.dbPath;
    this.Form.productImg=this.fileName;
    console.log("res:", this.Form);

    this.service.AddProduct(this.Form).subscribe(rs => {
      alert("Product Created ");
      /*this.service.GetProductList().subscribe(res => {
        this.FilterList= res;
        this.Flist=res;
    });*/
    });
  }
  onSubmit(){
    this.displayStyleCreate = "none";
    //console.log(this.createProfileForm.value);
    this.Form.productName=this.createProfileForm.value.productName;
    this.Form.category=this.createProfileForm.value.category;
    this.Form.description=this.createProfileForm.value.description;
    this.Form.quantityLeft=this.createProfileForm.value.quantityLeft;
    this.Form.productPrice=this.createProfileForm.value.productPrice;
    //this.createForm.productImg=this.response.dbPath;
    this.Form.productImg=localStorage.getItem("fileName")!;
    console.log("res:", this.Form);

    this.service.AddProduct(this.Form).subscribe(rs => {
      alert("Product Created ");
      this.service.GetProductList().subscribe(res => {
        this.FilterList= res;
        this.Flist=res;
      });
    });
  }
  onSubmitEdit() {
    this.displayStyle = "none";
    this.FormEdit.productId=this.editProfileForm.value.productId;
    this.FormEdit.productName=this.editProfileForm.value.productName;
    this.FormEdit.category=this.editProfileForm.value.category;
    this.FormEdit.description=this.editProfileForm.value.description;
    this.FormEdit.quantityLeft=this.editProfileForm.value.quantityLeft;
    this.FormEdit.productPrice=this.editProfileForm.value.productPrice;
    //this.Form.productImg=this.response.dbPath;
    this.FormEdit.productImg=localStorage.getItem("fileName")!;
    //console.log("res:", this.FormEdit);
    //console.log("res1:", this.editProfileForm.getRawValue().productId);
    this.service.UpdateProduct(this.editProfileForm.getRawValue().productId,this.FormEdit).subscribe(rs =>{
      alert("Product Edited!!");
      this.service.GetProductList().subscribe(res => {
        this.FilterList= res;
        this.Flist=res;
      });
    });
  }
  
  openPopupEdit(prod:any) {
    this.displayStyle = "block";
    
    this.editProfileForm.patchValue({
      productId:prod.productId,
      productName: prod.productName,
      productPrice:prod.productPrice,
      description:prod.description,
      category:prod.category,
      productImg:prod.productImg,
      quantityLeft:prod.quantityLeft
    });
  }
  closePopupEdit() {
    this.displayStyle = "none";
    //console.log("res:", this.editProfileForm.getRawValue());
  }
  

  RemoveProduct(prod:any){
    console.log(prod.productId);
    //Add DeleteBooleanValue in product table
    this.service.DeleteviaUpdate(prod.productId).subscribe(res =>{
      console.log("Product Deleted.");
      this.service.GetProductList().subscribe(res => {
        this.FilterList= res;
        this.Flist=res;
      });
    });
    
  }
}
   
 /* searchThis(data: any) {
    this.content = this.newArray;
    console.log(data);
    if (data) {
      this.content = this.content.filter(function (ele: { productName: string; }, i: any, array: any) {
        let arrayelement = ele.productName.toLowerCase()
        return arrayelement.includes(data)
      })
    }
    else {
      console.log(this.content)
    }
    console.log(this.content)
  }
  editModal(targetModal: any, prod: any) {
    this.modalService.open(targetModal,{
      centered: true,
      backdrop: 'static'
     });
    this.editProfileForm.patchValue({
      productId:prod.productId,
      productName: prod.productName,
      productPrice:prod.productPrice,
      description:prod.description,
      category:prod.category,
      productImg:prod.productImg,
      quantityLeft:prod.quantityLeft
    });
  }
  
  */


