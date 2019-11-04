import { Component, Output } from '@angular/core';

import { UserRow } from 'src/app/core/models';
import { AdminService } from 'src/app/core/services/admin.service';

import { Observable, empty } from 'rxjs';
import { map, first, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html',
  styleUrls: ['./manage-users-page.component.scss']
})
export class ManageUsersPageComponent {

  users$: Observable<UserRow[]>;

  headers: string[];
  searchText: string;

  constructor(private adminService: AdminService) {
    this.headers = [' ', 'Name', 'Number of orders', 'Last order', 'Make it admin', 'Delete user'];
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.searchText
      ? this.adminService.users$.pipe(map(users => users.filter(user => user.name.includes(this.searchText))))
      : this.adminService.users$;
  }

  search(searchText: string) {
    this.searchText = searchText;
    this.getUsers();
  }

  deleteUser(user: UserRow) {
    this.adminService.deleteUser(user.id).pipe(
      first(),
      catchError(_ => {
        alert('Error while deleting the user');
        return empty();
      })
    )
      .subscribe();
  }

  changeUserPermission(user: UserRow) {
    this.adminService.setPermission(user.id, !user.admin).pipe(
      first(),
      catchError(_ => {
        alert('Error while changing permission of the user');
        return empty();
      })
    )
      .subscribe();
  }
}
