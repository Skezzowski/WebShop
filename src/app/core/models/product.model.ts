import { ProductTile } from './product-tile.model';
import { Review } from './review.model';

export interface Product extends ProductTile {
    description: string;
    reviews: Review[];
}
