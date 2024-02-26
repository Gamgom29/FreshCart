import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  isLoading:boolean  = false;
  errMsg:string = '';
  registerForm:FormGroup = this._FormBuilder.group({
    name:['' , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email:['' , [Validators.required , Validators.email]],
    password:['',[Validators.required , Validators.pattern(/^\w{6,}$/)]],
    rePassword:['',[RxwebValidators.compare({fieldName:'password'})]],
    phone:['',[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })
  handleForm():void{
    if(this.registerForm.valid){
      this.isLoading = true;
      console.log(this.registerForm.value);
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next:(response)=>{
          this.isLoading = false;
          this._Router.navigate(['login']);
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
      this.registerForm.markAllAsTouched();
    }
  }

}
