import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PlaygroundComponent } from './playground/playground.component';
import { CartComponent } from './shop/cart/cart.component';
import { ProductComponent } from './shop/product/product.component';
import { ShopComponent } from './shop/shop.component';
import { UserSignInComponent } from './user/sign-in/sign-in.component';
import { UserSignOutComponent } from './user/sign-out/sign-out.component';
import { UserSignUpComponent } from './user/sign-up/sign-up.component';
import { SignedInGuardService } from './user/services/signed-in-guard.service';
import { UserProfileComponent } from './user/profile/profile.component';

const routes: Routes = [
  { path: 'playground', component: PlaygroundComponent },
  { path: '', component: HomepageComponent },
  { path: 'user/signin', component: UserSignInComponent, canActivate : [SignedInGuardService] },
  { path: 'user/signup', component: UserSignUpComponent, canActivate : [SignedInGuardService] },
  { path: 'user/signout', component: UserSignOutComponent },
  { path: 'user/profile', component: UserProfileComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
