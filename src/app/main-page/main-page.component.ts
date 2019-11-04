import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { ProductTile, Product, Filters, sortTypes } from '../core/models';
import { ProductService, CartService, ProductSorterService } from '../core/services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  products$: Observable<ProductTile[]>;
  categories$: Observable<string[]>;

  selectedCategory: string;
  filters: Filters;
  itemsPerPage: number;

  constructor(
    private productService: ProductService,
    private sorter: ProductSorterService,
    private router: Router,
    private cartService: CartService
  ) {
    this.itemsPerPage = 10;
    this.products$ = this.productService.products$;
    this.categories$ = this.productService.categories$;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.updateProductList();
  }

  removeCategorySelection() {
    this.selectedCategory = undefined;
    this.updateProductList();
  }

  onFilterChange(filters: Filters) {
    if (filters) {
      this.filters = JSON.parse(JSON.stringify(filters));
      if (this.filters.price === {}) {
        delete this.filters['price'];
      }
      if (filters.itemsPerPages) {
        this.itemsPerPage = this.filters.itemsPerPages;
      } else {
        this.itemsPerPage = 10;
      }
    } else {
      this.filters = filters;
    }
    this.updateProductList();
  }

  openProductPage(productId: string) {
    this.router.navigateByUrl(`product/${productId}`);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product).pipe(first()).subscribe();
  }

  private updateProductList() {
    this.products$ = this.selectedCategory
      ? this.productService.productsByCategory(this.selectedCategory)
      : this.productService.products$;

    if (this.filters) {
      this.products$ = this.products$.pipe(map(allProducts => this.filter(allProducts)));
    }
  }

  private filter(products: ProductTile[]): ProductTile[] {
    const filteredProducts = this.sorter.filterProducts(products, this.filters);
    const sortType = this.filters.sortBy.valueOf();
    if (this.filters.sortBy) {
      switch (this.filters.sortBy) {
        case sortTypes['1']: return this.sorter.sort(filteredProducts, 'price', 'ASC');
        case sortTypes['2']: return this.sorter.sort(filteredProducts, 'price', 'DESC');
        case sortTypes['3']: return this.sorter.sort(filteredProducts, 'date', 'ASC');
        case sortTypes['4']: return this.sorter.sort(filteredProducts, 'date', 'DESC');
        case sortTypes['5']: return this.sorter.sort(filteredProducts, 'name', 'ASC');
        case sortTypes['6']: return this.sorter.sort(filteredProducts, 'name', 'DESC');
      }
    }
    return filteredProducts;
  }
}
