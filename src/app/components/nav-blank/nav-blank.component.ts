import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { initFlowbite } from 'flowbite';
import { WishListService } from 'src/app/shared/services/wish-list.service';
@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  @ViewChild('navbar') navElement!:ElementRef;
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 300){
      this._Renderer2.addClass(this.navElement.nativeElement  , 'px-10');
    }
    else{
      this._Renderer2.removeClass(this.navElement.nativeElement  , 'px-10')
    }
  }
  constructor(private _AuthService:AuthService , private _CartService:CartService , private _Renderer2:Renderer2 , private _WishListService:WishListService){}
  uData:any = {};
  cartNumber:number = 0 ;
  wishNumber:number = 0;
  ngOnInit(): void {
    initFlowbite();
    this._CartService.cartNumber.subscribe({
      next:data=>{
        this.cartNumber = data;
      }
    });
    this._WishListService.wishNum.subscribe({
      next:data=>{
        this.wishNumber = data;
      }
    })
    this._WishListService.getUserList().subscribe({
      next:res=>{
        this.wishNumber = res.count;
      },
      error:err=>{
        console.log(err);
      }
    })
    this._CartService.getUserCart().subscribe({
      next:response=>{
        this.cartNumber = response.numOfCartItems
      },
    });
    if(localStorage.getItem('eToken')){
      this.uData = jwtDecode(localStorage.getItem('eToken')!);
      console.log(this.uData);
    }
  }
  logOut(){
    this._AuthService.logOutUser();
  }
}
