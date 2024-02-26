import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/interfaces/category';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{
  constructor(private _EcomdataService:EcomdataService ){}
  catData:Category [] = [];
  ngOnInit(): void {
      this._EcomdataService.getCategories().subscribe({
        next:response=>{
          this.catData = response.data ;
        },
        error:err=>{
          console.log(err);
        }
      })
  }
}
