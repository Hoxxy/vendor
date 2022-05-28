import { Injectable } from '@angular/core';
import { PopupService } from 'src/app/utils/popup.service';
import { CartService } from './cart.service';

@Injectable()
export class PromoService {
  constructor(private cartService: CartService, private popup: PopupService) { }

  applyPromoCode(promoCode: string) {
    setTimeout(() => {
      if (promoCode === "20OFF") {
        // valid promo code
        this.cartService.promoDeduction = this.cartService.subtotal * 0.2;

        this.popup.success({text: "The promo code has been applied successfully."});
      }
      else {
        this.popup.error({text: "The promo code you've entered is not valid."});
      }
    }, 200);
  }
}
