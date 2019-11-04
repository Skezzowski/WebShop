import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product } from '../core/models';
import { ProductService, CartService } from '../core/services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {

  product$: Observable<Product>;
  productId: string;

  constructor(
    productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private cartService: CartService
  ) {
    this.product$ = this.route.params.pipe(switchMap(params => productService.getProductById(params['productId'])));
    window.scrollTo({ top: 0 });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe();
  }

  rateProduct() {
    console.log('Missing feature!');
  }

  back() {
    this.location.back();
  }

}
