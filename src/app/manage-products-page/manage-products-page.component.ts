import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductService } from '../core/services';
import { ProductTile } from '../core/models';

@Component({
  selector: 'app-manage-products-page',
  templateUrl: './manage-products-page.component.html',
  styleUrls: ['./manage-products-page.component.scss']
})
export class ManageProductsPageComponent {

  products$: Observable<ProductTile[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.products$;
  }

  changePrice(product: ProductTile) {
    this.productService.updatePrice(product);
  }

}
