import { Injectable } from '@angular/core';

import { ProductTile, Filters } from '../../models';

@Injectable()
export class ProductSorterService {

    filterProducts(products: ProductTile[], filters: Filters) {
        return products.filter(product => {
            if (filters.text) {
                if (!product.name.includes(filters.text)) {
                    return false;
                }
            }
            if (filters.price) {
                if (filters.price.min && product.price < filters.price.min) {
                    return false;
                }
                if (filters.price.max && product.price > filters.price.max) {
                    return false;
                }
            }
            return true;
        });
    }

    sort(products: ProductTile[], property: keyof ProductTile, order: 'ASC' | 'DESC') {
        products = products.sort((x, y) => {
            if (x[property] < y[property]) {
                return -1;
            }
            if (x[property] > y[property]) {
                return 1;
            }
            return 0;
        });
        if (order === 'DESC') {
            return products.reverse();
        }
        return products;
    }
}
