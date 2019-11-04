import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnChanges {
  @Input() stars: number;
  @Input() active?: boolean;
  @Output() starSelect = new EventEmitter<number>();
  starImages: string[];

  constructor() {
    this.active = false;
  }

  ngOnChanges() {
    if (!this.stars) {
      this.stars = 1;
    }
    this.starImages = [];
    for (let i = 0; i < this.stars; i++) {
      this.starImages.push('assets/star_full.svg');
    }
    for (let i = this.starImages.length; i < 5; i++) {
      this.starImages.push('assets/star_empty.svg');
    }
  }

  putStar(selectedStar: number) {
    if (this.active) {
      this.starSelect.emit(selectedStar + 1);
    }
  }

}
