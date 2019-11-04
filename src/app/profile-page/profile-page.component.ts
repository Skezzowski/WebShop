import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { UserService } from '../core/services';
import { User, DeliveryDetails, ProductTile } from '../core/models';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {

  user$: Observable<User>;
  orders$: Observable<ProductTile[]>;

  constructor(private userService: UserService) {
    this.user$ = this.userService.user;
    this.orders$ = this.userService.getUserOrders(this.user$);
  }

  saveDeliveryDetails(deliveryDetails: DeliveryDetails) {
    this.userService.updateDeliveryDetails(deliveryDetails)
    .pipe(first())
    .subscribe(_ => {
        location.reload();
      });
  }

  updateProfilePicture(img: File) {
    this.userService.updateProfilePicture(img).pipe(first()).subscribe();
  }
}
