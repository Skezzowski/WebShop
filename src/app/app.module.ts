import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { WidgetsModule } from './widgets';
import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page';
import { RegisterLoginPageComponent } from './register-login-page';
import { ManageUsersPageComponent, UserTableRowComponent } from './manage-users-page';
import { ProfilePageComponent } from './profile-page';
import { NewProductPageComponent } from './new-product-page';
import { ChangePasswordComponent } from './widgets/dialogs/change-password';
import { ProductPageComponent } from './product-page';
import { ManageProductsPageComponent } from './manage-products-page';
import { CartPageComponent } from './cart-page';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RegisterLoginPageComponent,
    ManageUsersPageComponent,
    UserTableRowComponent,
    ProfilePageComponent,
    NewProductPageComponent,
    ProductPageComponent,
    ManageProductsPageComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    AngularFireStorageModule,
    CoreModule,
    WidgetsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ChangePasswordComponent]
})
export class AppModule { }
