import { Injectable } from '@angular/core';

import { ProductTile, Product, UserRow, CartItem } from '../../models';

@Injectable()
export class DataConverterService {

    convertRawProductsToProductsArray(rawProducts: Object): ProductTile[] {
        let products: ProductTile[] = [];
        const categories = Object.keys(rawProducts);
        for (const category of categories) {
            products = products.concat(this.convertRawCategoryToProductsArray(rawProducts[category]));
        }
        return products;
    }

    convertRawCategoryToProductsArray(rawCategory: Object): ProductTile[] {
        const products: ProductTile[] = [];
        const productIdsInCategory = Object.keys(rawCategory);
        for (const productId of productIdsInCategory) {
            const product = rawCategory[productId];
            products.push({
                id: productId,
                name: product.name,
                img: product.img,
                price: product.price,
                rating: product.rating,
                category: product.category,
                date: product.date
            });
        }
        return products;
    }

    convertRawUserToUserRow(id: string, rawUser: any, lastOrder: any, numberOfOrders: number): UserRow {
        return {
            id,
            img: rawUser.img,
            name: rawUser.name,
            numberOfOrders,
            lastOrder: lastOrder ? lastOrder.date : undefined,
            admin: rawUser.admin
        };
    }

    convertProductToRawProduct(product: Product): Object {
        return {
            name: product.name,
            img: product.img,
            category: product.category,
            price: product.price,
            rating: product.rating,
            reviews: product.reviews,
            date: product.date,
            description: product.description
        };
    }

    convertRawProductToProduct(rawProduct: Object, id: string): Product {
        return {
            id,
            name: rawProduct['name'],
            img: rawProduct['img'],
            price: rawProduct['price'],
            rating: rawProduct['rating'],
            category: rawProduct['category'],
            date: rawProduct['date'],
            description: rawProduct['description'],
            reviews: rawProduct['reviews']
        };
    }

    convertProductTileToCartItem(product: ProductTile): CartItem {
        return {
            img: <string>product.img,
            name: product.name,
            price: product.price,
            amount: 1
        };
    }
}
