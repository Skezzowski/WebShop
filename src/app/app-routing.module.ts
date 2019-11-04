import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MainPageComponent } from './main-page';
import { RegisterLoginPageComponent } from './register-login-page';
import { ManageUsersPageComponent } from './manage-users-page';
import { ProfilePageComponent } from './profile-page';
import { NewProductPageComponent } from './new-product-page';
import { ProductPageComponent } from './product-page';
import { ManageProductsPageComponent } from './manage-products-page';
import { CartPageComponent } from './cart-page';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mainpage'
    },
    {
        path: 'mainpage',
        component: MainPageComponent
    },
    {
        path: 'product/:productId',
        component: ProductPageComponent
    },
    {
        path: 'login',
        component: RegisterLoginPageComponent
    },
    {
        path: 'manageusers',
        component: ManageUsersPageComponent
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    },
    {
        path: 'newproduct',
        component: NewProductPageComponent
    },
    {
        path: 'manageproducts',
        component: ManageProductsPageComponent
    },
    {
        path: 'cart',
        component: CartPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule { }
