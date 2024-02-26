import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  wishNum:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/";
  addToWishlist(id:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}wishlist` , 
    {productId:id},
    )
  }
  getUserList():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}wishlist`)
  }
  deleteFromWishlist(id:string):Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}wishlist/${id}`)
  }
}
