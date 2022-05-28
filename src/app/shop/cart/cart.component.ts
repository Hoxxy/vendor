import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupService } from 'src/app/utils/popup.service';
import { IProduct } from '../product/product.model';
import { ISimpleCartItem } from './cart-item.model';
import { CartService } from './cart.service';
import { PromoService } from './promo.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  selectedShippingMethod = '15';
  shippingMethod = new FormControl();

  displayedColumns: string[] = ['title', 'quantity', 'price'];

  constructor(
    public cartService: CartService,
    public promoService: PromoService,
    private router: Router) {}

  ngOnInit(): void {
    this.cartService.retreiveSavedCartState();
    this.cartService.loadProductsInCart();
  }

  changeQuantity = (newQuantity: number, index: number) => {
    this.cartService.updateItemQuantity(index, newQuantity);
  };

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  getShippingCost = (): number => {
    return Number(this.selectedShippingMethod);
  }
}
