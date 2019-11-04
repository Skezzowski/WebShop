import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { ProductTile } from 'src/app/core/models';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnChanges {
  @Input() products: ProductTile[];
  @Input() adminMode: boolean;
  @Output() priceChange = new EventEmitter<ProductTile>();
  @Output() reviewStart = new EventEmitter<ProductTile>();

  productsToDisplay: ProductTile[];
  headers: string[];
  searchText: string;

  constructor() {
    this.headers = [' ', 'Name', 'Category', 'Time of adding', 'Price', 'Edit'];
  }

  ngOnChanges() {
    if (!this.searchText) {
      this.productsToDisplay = this.products;
    } else {
      this.productsToDisplay = [];
      for (const product of this.products) {
        if (product.name.toLowerCase().includes(this.searchText.toLowerCase())) {
          this.productsToDisplay.push(product);
        }
      }
    }
  }

  fillProductsToDisplay(searchText: string) {
    this.searchText = searchText;
    this.ngOnChanges();
  }

  changePrice(product: ProductTile) {
    this.priceChange.emit(product);
  }

  review(product: ProductTile) {
    this.reviewStart.emit(product);
  }

}
