import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  isLoading:boolean  = false;
  errMsg:string = '';
  loginForm:FormGroup = this._FormBuilder.group({
    email:['' , [Validators.required , Validators.email]],
    password:['',[Validators.required , Validators.pattern(/^\w{6,}$/)]]
  })
  handleForm():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      console.log(this.loginForm.value);
      this._AuthService.setLogin(this.loginForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this._AuthService.saveToken(response.token);
          this._Router.navigate(['/home']);
          console.log(response);
        } ,
        error:(err)=>{
          this.errMsg = err.error.message
          console.log(err);
          this.isLoading = false;
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }


}
