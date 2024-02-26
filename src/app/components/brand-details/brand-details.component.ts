import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {
  constructor(private _EcomdataService:EcomdataService , private _ActivatedRoute: ActivatedRoute){}
  brandDetails:any;
ngOnInit(): void {
    let id:any = '';
    this._ActivatedRoute.paramMap.subscribe({
      next:data=>{
        id=data.get('id');
      }
    });
    this._EcomdataService.getBrandDetails(id).subscribe({
      next:res=>{
        console.log(res.data);
        this.brandDetails = res.data ;
      },
      error:err=>{
        console.log(err);
        
      }
    });
}
}
