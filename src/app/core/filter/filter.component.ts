import { Component, Output, Input, EventEmitter} from '@angular/core';

import { Filters , sortTypes} from '../models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {
  filters: Filters;
  sortTypesArray: string[];
  itemsPerPagesArray: string[];
  stringIsNumber: (value: any) => boolean;

  @Input() text: string;
  @Output() filterChange = new EventEmitter<Filters>();

  constructor() {
    this.initDatas();
    this.itemsPerPagesArray = [
      '10',
      '25',
      '50',
      '75',
      '100',
    ];
    this.stringIsNumber = value => isNaN(Number(value)) === false;
    this.sortTypesArray = this.toArray(sortTypes);
  }

  search() {
    this.filterChange.emit(this.filters);
  }

  reset() {
    this.initDatas();
    this.filterChange.emit(this.filters);
  }

  onResultPerPagesChanged() {
    this.filterChange.emit(this.filters);
  }

  onSortingTypeChanged() {
    this.filterChange.emit(this.filters);
  }

  toArray(enumArray: any): string[] {
    return Object.keys(sortTypes).filter(this.stringIsNumber).map(key => enumArray[key]);
  }

  initDatas() {
    this.filterChange.emit(
      this.filters = {
        text: this.text,
        price: {
          min: undefined,
          max: undefined
        },
        itemsPerPages: 10,
        sortBy: sortTypes['0']
    });
  }
}
