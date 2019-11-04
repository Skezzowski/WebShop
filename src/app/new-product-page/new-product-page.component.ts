import { Component } from '@angular/core';

import { Observable, empty } from 'rxjs';
import { first, map, switchMap, catchError } from 'rxjs/operators';

import { ProductService, UserService, FileService } from '../core/services';
import { Product } from '../core/models';

@Component({
  selector: 'app-new-product-page',
  templateUrl: './new-product-page.component.html',
  styleUrls: ['./new-product-page.component.scss']
})
export class NewProductPageComponent {

  file: File;
  categories$: Observable<string[]>;
  success: boolean;

  constructor(private productService: ProductService, private userService: UserService, private fileService: FileService) {
    this.categories$ = this.productService.categories$;
  }

  fileUpload(event) {
    this.file = event.target.files[0];
  }

  onCreate(data) {
    if (this.file) {
      this.userService.user.pipe(
        first(),
        map(user => user.id),
        map(id => {
          const product: Product = {
            id: new Date().getSeconds() + new Date().getMilliseconds() + id.substring(0, 5) + Math.floor(Math.random() * 12345678),
            name: data.value.prodName,
            img: this.file,
            price: data.value.prodPrice,
            rating: 0,
            category: data.value.prodCategory,
            date: new Date().toISOString(),
            description: data.value.prodDescription,
            reviews: null
          };
          return product;
        }),
        switchMap(prod =>
          this.fileService.uploadProduct(prod)
        ),
        catchError(_ => {
          this.success = false;
          return empty();
        })
      )
        .subscribe(_ => {
          location.reload();

        });
    }
  }

}
