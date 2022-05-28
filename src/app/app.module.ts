import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase/app';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ShopComponent } from './shop/shop.component';
import { ProductCategoryService } from './shop/product/product-category/product-category.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './shop/product/product.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopupService } from './utils/popup.service';
import { ProductComponent } from './shop/product/product.component';
import { QuantityControlComponent } from './utils/quantity-control/quantity-control.component';
import { CartService } from './shop/cart/cart.service';
import { CartComponent } from './shop/cart/cart.component';
import { PromoService } from './shop/cart/promo.service';
import { UserSignInComponent } from './user/sign-in/sign-in.component';
import { UserSignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user/profile/profile.component';
import { environment } from 'src/environments/environment';
import { UserService } from './user/services/user.service';
import { UserSignOutComponent } from './user/sign-out/sign-out.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ProductServiceApi } from './api/product.api';
import { ProductCategoryServiceApi } from './api/product-category.api';
import { LoaderComponent as LoaderComponent } from './core/loader/loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { loaderInterceptorProviders } from './core/loader/loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ErrorHandlerService } from './utils/error-handler.service';
import { UtilsService } from './utils/utils.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TokenStorageService } from './user/services/token-storage.service';
import { AuthApiService } from './api/auth.api';
import { authInterceptorProviders } from './user/helpers/auth.interceptor';
import { UserApiService } from './api/user.api';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    PlaygroundComponent,
    AppComponent,
    LoaderComponent,
    HomepageComponent,
    NavbarComponent,
    ShopComponent,
    ProductComponent,
    QuantityControlComponent,
    CartComponent,
    UserSignInComponent,
    UserSignUpComponent,
    UserSignOutComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    ProductCategoryService,
    ProductService,
    PopupService,
    CartService,
    PromoService,
    UserService,
    ProductServiceApi,
    ProductCategoryServiceApi,
    UserApiService,
    ErrorHandlerService,
    UtilsService,
    AuthApiService,
    TokenStorageService,
    authInterceptorProviders,
    loaderInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
