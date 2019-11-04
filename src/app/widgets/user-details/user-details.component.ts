import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { User } from 'src/app/core/models';
import { ChangePasswordComponent } from '../dialogs/change-password';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {

  @Input() user: User;
  @Output() imgChange = new EventEmitter<File>();

  constructor(private dialog: MatDialog) { }

  onPictureChange(event): void {
    this.imgChange.emit(event.target.files[0]);
  }

  showChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordComponent);
  }
}
