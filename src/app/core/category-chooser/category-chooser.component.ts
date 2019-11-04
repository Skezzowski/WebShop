import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-category-chooser',
  templateUrl: './category-chooser.component.html',
  styleUrls: ['./category-chooser.component.scss']
})
export class CategoryChooserComponent {

  @Input() categories: string[];
  @Input() selectedCategory?: string;
  @Output() selectCategory = new EventEmitter<string>();
  @Output() categoryClear = new EventEmitter<void>();

  constructor() { }

  onSelect(category: string) {
    this.selectCategory.emit(category);
  }

  clearCategory() {
    this.categoryClear.emit();
  }

}
