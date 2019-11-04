import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    FirebaseService, DataConverterService, UserService, ProductService, AuthService, FileService, AdminService,
    CartService, ProductSorterService
} from './services';

import { NavigationComponent, NavigatorComponent } from './navigation';
import { CategoryChooserComponent } from './category-chooser';
import { LoginComponent, RegisterComponent } from './loginAndRegistration';
import { ValidatorService } from './util/validators';
import { CartIconComponent } from './cart-icon';
import { FilterComponent } from './filter/filter.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        NavigatorComponent,
        NavigationComponent,
        CategoryChooserComponent,
        LoginComponent,
        RegisterComponent,
        CartIconComponent,
        FilterComponent
    ],
    exports: [
        NavigationComponent,
        CategoryChooserComponent,
        LoginComponent,
        RegisterComponent,
        CartIconComponent,
        FilterComponent
    ],
    providers: [
        FirebaseService,
        UserService,
        DataConverterService,
        ProductService,
        AuthService,
        AdminService,
        FileService,
        ValidatorService,
        CartService,
        ProductSorterService
    ],
})
export class CoreModule { }
