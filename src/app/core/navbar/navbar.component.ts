import { Component } from '@angular/core';
import { CartService } from 'src/app/shop/cart/cart.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(public cartService: CartService, public userService: UserService) { }
}
