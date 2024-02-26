import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenId:string = '';
  constructor(private _HttpClient:HttpClient , private _Router:Router) { }
  setRegister(userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData);
  }
  setLogin(userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData)
  }
  saveToken(token:string){
    localStorage.setItem('eToken' , token);
    let tokenId:any;
    tokenId = jwtDecode(token);
  }
  logOutUser(){
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login'])
  }

  resetPass(email:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,email);
  }
  confirmCode(code:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , code)
  }
  changePassword(userData:object):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , userData)
  }
}
