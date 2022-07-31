import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { catchError, endWith, map, Observable, of, startWith } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/service/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //products?:Product[]; 
  products$:Observable<AppDataState<Product[]>>|null=null; 
  readonly DataStateEnum=DataStateEnum;

  constructor(private productService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }
  
  /*onGetAllProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products=data;
    }
    ,
    error=>{
      console.log(error)
    })
  }*/

  /*onGetAllProducts(){
    this.products$=this.productService.getAllProducts();
  }*/
  onGetAllProducts(){
    this.products$=this.productService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetSelectedProducts(){
    this.products$=this.productService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onGetAvailableProducts(){
    this.products$=this.productService.getAvailableProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSearch(dataForm:any){
    this.products$=this.productService.getSearch(dataForm.keyword).pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }

  onSelect(p:Product){
    this.productService.selectProduct(p).subscribe(data=>{
      p.selected=data.selected;
    })
  }

  onDeleted(p:Product){
    let v= confirm("Ëtes-vous sûre de vouloir supprimer ? ")
    if(v==true){
      this.productService.deteleProduct(p).subscribe(data=>{
        this.onGetAllProducts()
      })
    }
  }
//ici je navigue pour aller vers un autre composant
  onNewProduct(){
    this.router.navigateByUrl("/newProduct");
  }
  
}
