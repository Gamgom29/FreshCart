import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/shared/services/wish-list.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService , private _ActivatedRoute:ActivatedRoute , private _CartService:CartService ,
    private _ToastrService:ToastrService , private _WishListService:WishListService){}
  data:Product = {} as Product;
  wishlist:any[] = [];
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          let id = param.get('id')!;
          this._EcomdataService.getProductDetails(id).subscribe({
            next:(response)=>{
              this.data = response.data;
            } , 
            error:(err)=>{
              console.log(err);
            }
          });
        }
        , error:(err)=>{
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
        console.log(response);
        this._CartService.cartNumber.next(response.numOfCartItems);
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
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }

}
