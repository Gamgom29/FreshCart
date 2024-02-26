import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService ,
  private _ToastrService:ToastrService , private _WishListService:WishListService){}
  products:Product[] = [];
  wishlist:any[] = [];
  ngOnInit(): void {
    this._WishListService.getUserList().subscribe({
      next:res=>{
        console.log(res);
        this.products = res.data
        const newdata = res.data.map((item:any)=> item._id)
          this.wishlist = newdata;
      }
    })
  }
  addToCart(productId:string){

    this._CartService.addProductToCart(productId).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems);
        console.log(response);
        this._ToastrService.success(response.message , '' ,{
          timeOut:2500,
          closeButton:true,
          progressBar:true,
        })
      }, 
      error:(err)=>{
        console.log(err);
      }
    })
  }
  
  deletefromWish(id:string){
    this._WishListService.deleteFromWishlist(id).subscribe({
      next:res=>{
        console.log(res);
        this.wishlist = res.data;
        const newdata = this.products.filter((item:any)=> this.wishlist.includes(item._id));
        this.products = newdata;
        this._WishListService.wishNum.next(res.data.length);
        this._ToastrService.error(res.message , '' ,{
          timeOut:2500,
          closeButton:true,
          progressBar:true,
        })
      },error:err=>{
        console.log(err);
        
      }
    });
  }
}
