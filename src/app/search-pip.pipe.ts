import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'searchPip'
})
export class SearchPipPipe implements PipeTransform {

  transform(productList:Product[] , term:string): Product[] {
    return (term == '') ? productList.reverse().slice(0,12) : productList.filter( item => item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
