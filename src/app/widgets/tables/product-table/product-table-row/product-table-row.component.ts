import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ProductTile } from 'src/app/core/models';

@Component({
  selector: 'app-product-table-row',
  templateUrl: './product-table-row.component.html',
  styleUrls: ['./product-table-row.component.scss']
})
export class ProductTableRowComponent {

  @Input() product: ProductTile;
  @Input() adminMode?: boolean;
  @Output() productReview = new EventEmitter<void>();
  @Output() priceChange = new EventEmitter<void>();

  disabled: boolean;

  constructor() {
    this.disabled = true;
  }

  reviewProduct() {
    this.productReview.emit();
  }

  editPrice() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.priceChange.emit();
    }
  }

}
