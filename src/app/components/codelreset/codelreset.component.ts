import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-codelreset',
  templateUrl: './codelreset.component.html',
  styleUrls: ['./codelreset.component.css']
})
export class CodelresetComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  errMsg:string='';
  coseResetForm:FormGroup = this._FormBuilder.group({
    resetCode:['' , [Validators.required]]
  });
  handleForm(){
    if(this.coseResetForm.valid){
      this._AuthService.confirmCode(this.coseResetForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          localStorage.setItem('resetState' , response.status);
          this._Router.navigate(['/resetpass/changePass']);
        },
        error:(err)=>{
          console.log(err);
          this.errMsg = err.error.message;
        }
      });
    }
  }
}
