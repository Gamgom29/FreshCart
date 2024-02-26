import { Component, OnInit, Pipe } from '@angular/core';
import {  Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}
  dataProducts:any; 
  numOfCartItems:number = 0;
  totaCartPrice:number = 0 ;
  cartId:string = '';
  ngOnInit():void {
      this._CartService.getUserCart().subscribe({
        next: response=>{
          this.numOfCartItems = response.numOfCartItems;
          this.totaCartPrice = response.data.totalCartPrice;
          this.dataProducts = response.data.products;
          this.cartId = response.data._id;
          console.log(response);
        } , 
        error: err=>{
          console.log(err);
        }
      });
    }
    updateCartQuantity(pId:string , count:number){
      if(count > 0 ){
        this._CartService.updateCartQuantity(pId , count).subscribe({
          next:response=>{
            this.numOfCartItems = response.numOfCartItems;
            this.totaCartPrice = response.data.totalCartPrice;
            this.dataProducts = response.data.products;
            console.log(response);
            
          } , 
          error:err=>{
            console.log(err);
            
          }
        })
      }
      
    }
    deleteItem(pId:string){
      this._CartService.removeFromCart(pId).subscribe({
        next: response=>{
          this.numOfCartItems = response.numOfCartItems;
          this.totaCartPrice = response.data.totalCartPrice;
          this.dataProducts = response.data.products;
          this._CartService.cartNumber.next(response.numOfCartItems)
          console.log(response);
        } , 
        error: err=>{
          console.log(err);
        }
      })
    }
    clearCart(){
      this._CartService.clearCart().subscribe({
        next:response=>{
          this.numOfCartItems = 0 ;
          this.totaCartPrice = 0;
          this.dataProducts = [];
          this._CartService.cartNumber.next(0);
        }
      })
    }
}
