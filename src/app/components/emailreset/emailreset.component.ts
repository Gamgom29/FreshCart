import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emailreset',
  templateUrl: './emailreset.component.html',
  styleUrls: ['./emailreset.component.css']
})
export class EmailresetComponent {
  constructor(private _FormBuilder:FormBuilder , private _AuthService:AuthService , private _Router:Router){}
  errMsg:string='';
  emailResetForm:FormGroup = this._FormBuilder.group({
    email:['' , [Validators.required , Validators.email]]
  });
  handleForm(){
    if(this.emailResetForm.valid){
      this._AuthService.resetPass(this.emailResetForm.value).subscribe({
        next:(response)=>{
          console.log(response);
          this._Router.navigate(['/resetpass/code']);
        },
        error:(err)=>{
          console.log(err);
          this.errMsg = err.error.message;
        }
      });
    }
  }
}
