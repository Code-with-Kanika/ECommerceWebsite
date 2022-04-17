import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product.model';

@Pipe({
  name: 'itemFilter',
  pure: false
})
export class ItemFilterPipe implements PipeTransform {
  transform(product:Product[], searchTerm:string): Product[] {
    //console.log("pipe");
    if (!product || !searchTerm) {
        return product;
    }
    return product.filter(item => item.productName.toLowerCase().startsWith(searchTerm.toLowerCase().trimEnd()));
}
}

