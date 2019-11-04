import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UserRow } from 'src/app/core/models';

@Component({
  selector: 'app-user-table-row',
  templateUrl: './user-table-row.component.html',
  styleUrls: ['./user-table-row.component.scss']
})
export class UserTableRowComponent {

  @Input() user: UserRow;
  @Output() userDelete = new EventEmitter<void>();
  @Output() permissionChange = new EventEmitter<void>();

  constructor() { }

  deleteUser() {
    this.userDelete.emit();
  }

  changeUserPermission() {
    this.permissionChange.emit();
  }

}
