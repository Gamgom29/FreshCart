import { Component, OnInit } from '@angular/core';
import {  Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/shared/interfaces/category';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/shared/services/wish-list.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading:boolean = true;
  searchTerm:string = '';
  AddedToCart:boolean = false;
  products:Product[] = [];
  categories:Category[] = [];
  wishlist:any[] = [];
  constructor(private _EcomdataService:EcomdataService , private _CartService:CartService ,
    private _ToastrService:ToastrService , private _WishListService:WishListService){}
  ngOnInit(): void {
      this._EcomdataService.getAllProducts().subscribe({
        next:(response)=>{
          this.isLoading = false;
          this.products = response.data;
          console.log(this.products);
        },
        error:(err)=>{
          this.isLoading = false
          console.log(err);
        }
      });

      this._EcomdataService.getCategories().subscribe({
        next:(response)=>{
          this.categories = response.data;
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 3,
        
      },
      400: {
        items: 3,
        nav:false
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
