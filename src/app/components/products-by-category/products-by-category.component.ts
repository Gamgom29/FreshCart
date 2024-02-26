import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishListService } from 'src/app/shared/services/wish-list.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
  products:Product[] = [];
  wishlist:any[] = [];
  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishListService:WishListService, private _ActivatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    let id:string  = '';
  this._ActivatedRoute.paramMap.subscribe({
      next:param=>{
        id = param.get('id')||'';
        console.log(id);
      }
    });
  this._EcomdataService.getProductsByCat( 'category',id).subscribe({
    next:(response)=>{
      this.products = response.data;
    },
    error:(err)=>{
      console.log(err);
    }
  });
  this._WishListService.getUserList().subscribe({
    next:res=>{
      const newdata = res.data.map((item:any)=> item._id)
      this.wishlist = newdata;
    },
    error:err=>{
      console.log(err);
    }
  });
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
addToWish(id:string){
  this._WishListService.addToWishlist(id).subscribe({
    next:res=>{
      console.log(res);
      this.wishlist = res.data;
      this._WishListService.wishNum.next(res.data.length);
      this._ToastrService.success(res.message , '' ,{
        timeOut:2500,
        closeButton:true,
        progressBar:true,
      })
    }
  });
}
deletefromWish(id:string){
  this._WishListService.deleteFromWishlist(id).subscribe({
    next:res=>{
      console.log(res);
      this.wishlist = res.data;
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
