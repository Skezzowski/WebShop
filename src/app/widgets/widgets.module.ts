import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TileComponent } from './tile';
import { GoogleLoginComponent } from './google-login';
import { StarsComponent } from './stars';
import { ProductTableComponent, ProductTableRowComponent } from './tables';
import { DeliveryDetailsComponent } from './delivery-details';
import { UserDetailsComponent } from './user-details';
import { ChangePasswordComponent } from './dialogs/change-password';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    declarations: [
        TileComponent,
        GoogleLoginComponent,
        StarsComponent,
        ProductTableComponent,
        ProductTableRowComponent,
        DeliveryDetailsComponent,
        UserDetailsComponent,
        ChangePasswordComponent
    ],
    exports: [
        TileComponent,
        GoogleLoginComponent,
        StarsComponent,
        ProductTableComponent,
        ProductTableRowComponent,
        DeliveryDetailsComponent,
        UserDetailsComponent,
        ChangePasswordComponent
    ],
    providers: [],
})
export class WidgetsModule { }
