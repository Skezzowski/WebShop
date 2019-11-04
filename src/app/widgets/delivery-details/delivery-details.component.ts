import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DeliveryDetails } from 'src/app/core/models';

@Component({
  selector: 'app-delivery-details',
  templateUrl: './delivery-details.component.html',
  styleUrls: ['./delivery-details.component.scss']
})
export class DeliveryDetailsComponent implements OnInit {

  @Input() inDeliveryDetails: DeliveryDetails;
  @Output() deliveryDetailsSubmit = new EventEmitter<DeliveryDetails>();

  public frmDelivery: FormGroup;
  private outDeliveryDetails: DeliveryDetails;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.inDeliveryDetails) {
      this.outDeliveryDetails = this.inDeliveryDetails;
    } else {
      this.outDeliveryDetails = {
        fullName: null,
        address: null,
        city: null,
        country: null,
        phoneNumber: null,
        zipCode: null
      };
    }

    this.frmDelivery = this.createDetailsForm();
  }

  onSave(data): void {
    this.outDeliveryDetails = {
      fullName: data.name,
      address: data.address,
      city: data.city,
      country: data.country,
      phoneNumber: data.phoneNumber,
      zipCode: data.zipCode
    };
    this.deliveryDetailsSubmit.emit(this.outDeliveryDetails);
  }

  private createDetailsForm(): FormGroup {
    return this.fb.group(
      {
        name: [
          this.outDeliveryDetails.fullName,
          Validators.required
        ],
        country: [
          this.outDeliveryDetails.country,
          Validators.required
        ],
        zipCode: [
          this.outDeliveryDetails.zipCode,
          Validators.required
        ],
        city: [
          this.outDeliveryDetails.city,
          Validators.required
        ],
        address: [
          this.outDeliveryDetails.address,
          Validators.required
        ],
        phoneNumber: [
          this.outDeliveryDetails.phoneNumber,
          Validators.required
        ],
      }
    );
  }
}
