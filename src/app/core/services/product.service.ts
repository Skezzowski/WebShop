import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FirebaseService } from './firebase.service';
import { DataConverterService } from './util/data-converter.service';
import { ProductTile, Product } from '../models';

@Injectable()
export class ProductService {

    constructor(private firebase: FirebaseService, private converter: DataConverterService) { }

    get products$(): Observable<ProductTile[]> {
        return this.firebase.products$.pipe(map(rawProducts => rawProducts
            ? this.converter.convertRawProductsToProductsArray(rawProducts)
            : []
        ));
    }

    get categories$(): Observable<string[]> {
        return <Observable<string[]>>this.firebase.categories$;
    }

    getProductById(id: string): Observable<Product> {
        return this.firebase.productById(id).pipe(map(rawProduct => rawProduct
            ? this.converter.convertRawProductToProduct(rawProduct, id)
            : undefined
        ));
    }

    productsByCategory(category: string) {
        return this.firebase.products$.pipe(
            map(products => products[category]),
            map(products => products ? this.converter.convertRawCategoryToProductsArray(products) : [])
        );
    }

    updatePrice(product: ProductTile): Observable<void> {
        return this.firebase.updatePrice(product);
    }
}
