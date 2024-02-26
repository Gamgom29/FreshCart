import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient:HttpClient) { }
  cartNumber:BehaviorSubject<number>= new BehaviorSubject(0);
  baseUrl:string = "https://ecommerce.routemisr.com/api/v1/";
  gitHubLink:string = 'https://gamgom29.github.io/FreshCart/'
  addProductToCart(productId:string):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}cart` , 
    {productId:productId},
    )
  };
  getUserCart():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}cart` , 
    )
  };
  updateCartQuantity(pId:string , count:number):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}cart/${pId}` ,
    {count:count}, 
    )
  }
  removeFromCart(pId:string):Observable<any>{
      return this._HttpClient.delete(`${this.baseUrl}cart/${pId}` , 
      )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${this.baseUrl}cart` , 
    )
  } 

  checkout(cartId:string , orderDetails:object):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}orders/checkout-session/${cartId}?url=${this.gitHubLink}`,
    {
      shippingAddress:orderDetails
    },
    )
  }
}
