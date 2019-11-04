import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {

  @Input() buttonTexts: string[];
  @Output() menuSelect = new EventEmitter<string>();

  constructor() { }

  onClick(buttonText: string) {
    this.menuSelect.emit(buttonText);
  }

}
