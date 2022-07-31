
import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  constructor(private http:HttpClient) {
  
  }
//ici dans le service on recupere les données provenant de la vue
  getAllProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products");
  }

  getSelectedProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true");
  }
  getAvailableProducts():Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?available=true");
  }

  getSearch(keyword:string):Observable<Product[]>{
    let host=environment.host;
    return this.http.get<Product[]>(host+"/products?name_like="+keyword);
  }

  selectProduct(product:Product):Observable<Product>{
    let host=environment.host;
    product.selected=!product.selected;
    return this.http.put<Product>(host+"/products/"+product.id,product);
  }

  deteleProduct(product:Product):Observable<void>{
    let host=environment.host;
    return this.http.delete<void>(host+"/products/"+product.id);
  }
  saveProduct(product:Product):Observable<Product>{
    let host=environment.host;
    return this.http.post<Product>(host+"/products",product);
  }
}
