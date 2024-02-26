import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  userId:string = '';
  orders:any []= [];
  constructor(private _AuthService:AuthService , private _OrdersService:OrdersService){}
  ngOnInit(): void {
      let token = localStorage.getItem('eToken')||'';
      let encodeToken:any= jwtDecode(token);
      this.userId = encodeToken.id;
      this._OrdersService.getUserOrders(this.userId).subscribe({
        next:res=>{
          console.log(res);
          this.orders = res;
        } , 
        error:err=>{
          console.log(err);
        }
      })
  }
}
