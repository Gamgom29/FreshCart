import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  errMsg:string='';
  changePassForm:FormGroup = this._FormBuilder.group({
    email:['' ,[Validators.required ,Validators.email]],
    newPassword:['',[Validators.required , Validators.pattern(/^\w{6,}$/)]]
  });
  handleForm(){
    if(this.changePassForm.valid){
      this._AuthService.changePassword(this.changePassForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          localStorage.removeItem('resetState');
          this._Router.navigate(['/login']);
        },
        error:(err)=>{
          console.log(err);
          this.errMsg = err.error.message;
        }
      });
    }
  }

}
