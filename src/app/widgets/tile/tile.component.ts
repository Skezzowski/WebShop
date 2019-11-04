import { Component, Input } from '@angular/core';
import { Output, EventEmitter} from '@angular/core';

import { ProductTile } from '../../core/models';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {

  @Input() product?: ProductTile;

  @Output() toCart: EventEmitter<void> = new EventEmitter<void>();
  @Output() openProduct: EventEmitter<void> = new EventEmitter<void>();

  openProductPage(): void {
    this.openProduct.emit();
  }

  addToCart(e: Event): void {
    this.toCart.emit();
    e.stopPropagation();
  }

}
