import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartId:string = '';
  constructor(private _ActivatedRoute: ActivatedRoute , private _FormBuilder: FormBuilder , private _CartService:CartService){}
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:param=>{
          this.cartId = param.get('cartId')!;
          console.log(this.cartId);
        },
      });
  }
  orderForm:FormGroup =  this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:[''],
});
  handleForm():void{
    console.log(this.orderForm.value);
    this._CartService.checkout(this.cartId , this.orderForm.value).subscribe({
    next:response=>{
      if(response.status == 'success'){
        window.open(response.session.url , '_self');
      }
    },
    error:err=>{
      console.log(err);
    }
    });
  }
}
