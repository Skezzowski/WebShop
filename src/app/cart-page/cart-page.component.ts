import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { CartItem } from '../core/models';
import { CartService } from '../core/services';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  items$: Observable<CartItem[]>;

  constructor(private cartService: CartService, private router: Router) {
    this.items$ = cartService.cart;
  }

  back() {
    this.router.navigateByUrl('mainpage');
  }

  buy() {
    alert('Missing feature!');
  }

  lessOf(item: CartItem, index: number) {
    this.cartService.updateItemAmount(index, item.amount - 1).subscribe();
  }

  moreOf(item: CartItem, index: number) {
    this.cartService.updateItemAmount(index, item.amount + 1).subscribe();
  }

  removeItem(index: number) {
    this.cartService.deleteItem(index).subscribe();
  }

}
