import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { tap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService, AuthService } from '../services';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  leftMenus: string[];
  rightMenus: string[];

  constructor(private userService: UserService, private router: Router, private autService: AuthService) {

    this.userService.user.pipe(
      takeUntil(this.unsubscribe$),
      tap(user => {
        if (user) {
          this.rightMenus = [user.name, 'LOGOUT'];
          if (user.admin) {
            this.leftMenus = ['MAIN PAGE', 'MANAGE PRODUCTS', 'NEW PRODUCT', 'MANAGE USERS'];
          } else {
            this.leftMenus = ['MAIN PAGE'];
          }
        } else {
          this.leftMenus = ['MAIN PAGE'];
          this.rightMenus = ['LOGIN'];
        }
      })
    ).subscribe();
  }

  selectMenu(menu: string) {
    const urlSegment = menu.toLowerCase().split(' ').join('');
    this.router.navigate([urlSegment]);
  }

  openCart() {
    this.router.navigateByUrl('/cart');
  }

  openPage(data: string) {
    if (data === 'LOGOUT') {
      this.autService.logOut().subscribe(_ => this.router.navigateByUrl('mainpage'));
    } else if (data === 'LOGIN') {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('profile');
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
