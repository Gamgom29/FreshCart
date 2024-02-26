import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/shared/services/wish-list.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:Product[] = [];
  isLoading:boolean = true;
  pageSize:number = 0 ;
  curPage:number = 1 ;
  total:number = 0 ;
  wishlist:any[] = [];
  AddedToCart:boolean = false;
  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishListService:WishListService){}
  ngOnInit(): void {
  this._EcomdataService.getAllProducts().subscribe({
    next:(response)=>{
      this.isLoading = false;
      this.products = response.data;
      this.pageSize = response.metadata.limit;
      this.curPage = response.metadata.currentPage;
      this.total = response.results;
    },
    error:(err)=>{
      this.isLoading = false;
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
  })
}
addToCart(productId:string){
  this.AddedToCart = true;
  this.isLoading = true;
  this._CartService.addProductToCart(productId).subscribe({
    next:(response)=>{
      this.isLoading = false;
      this._CartService.cartNumber.next(response.numOfCartItems);
      this.AddedToCart = false;
      console.log(response);
      this._ToastrService.success(response.message , '' ,{
        timeOut:2500,
        closeButton:true,
        progressBar:true,
      })
    }, 
    error:(err)=>{
      this.isLoading = false;
      this.AddedToCart = false;
      console.log(err);
    }
  })
}
  pageChanged(event:any){
    this.isLoading = true;
    this._EcomdataService.getAllProducts(event).subscribe({
      next:(response)=>{
        this.isLoading = false;
        this.products = response.data;
        this.pageSize = response.metadata.limit;
        this.curPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error:(err)=>{
        this.isLoading = false;
        console.log(err);
      }
    });
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
