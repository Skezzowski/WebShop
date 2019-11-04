import { Component, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../services';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent {
  @Output() cartOpen = new EventEmitter<void>();

  itemCount$: Observable<number>;

  constructor(cartService: CartService) {
    this.itemCount$ = cartService.cart.pipe(map(items => items.length));
  }

  cart() {
    this.cartOpen.emit();
  }

}
