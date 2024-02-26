import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {
  constructor(private _HttpClient:HttpClient) { }

  getAllProducts(pageSize:number = 1):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageSize}`)
  }
  getProductDetails(pId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${pId}`);
  }
  getProductsByCat(type:string , id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?${type}=${id}`);
  }
  getCategories():Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  getBrands():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
  getBrandDetails(id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  }
}
