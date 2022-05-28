import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductServiceApi } from 'src/app/api/product.api';
import { ErrorHandlerService } from 'src/app/utils/error-handler.service';
import { PopupService } from 'src/app/utils/popup.service';
import { IProduct } from '../product/product.model';
import { ICartItem, ISimpleCartItem } from './cart-item.model';

@Injectable()
export class CartService {

  public cartListSubject = new BehaviorSubject<ICartItem[]>([]);
  public simpleCartListSubject = new BehaviorSubject<ISimpleCartItem[]>([]);

  private listOfProducts: IProduct[] = [];
  public cartList: ICartItem[] = [];
  public simpleCartList: ISimpleCartItem[] = [];
  public subtotal: number = 0;
  public shippingCost: number = 0;
  public promoDeduction: number = 0;

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router,
    private popup: PopupService,
    private productServiceAPI: ProductServiceApi,
    private errorHandlerService: ErrorHandlerService) {
    this.cartUpdateListener();
  }

  cartUpdateListener = (): void => {
    this.retreiveSavedCartState();

    this.cartListSubject.subscribe(data => {
      if (data.length != this.cartList.length) {
        // if we are here, that means no data was retreived from the session storage
        this.cartList = data;
      }

      this.subtotal = 0;
      for (let cart of this.cartList) {
        this.subtotal += cart.product.price * cart.quantity;
      }
    });
  };

  countProductsInCart = (): void => {

  }

  public loadProductsInCart = (): void => {
    if (this.simpleCartList.length) {
      for (let i = 0; i < this.simpleCartList.length; i++) {
        this.productServiceAPI.findProduct(this.simpleCartList[i].productId).subscribe({
          next: (data: any) => {
            this.listOfProducts.push(data.data);

            this.addItemToSimpleCartList(this.simpleCartList[i]);
          },
          complete: () => {
            // In this case, because of the if statement, the 'complete' property executes only on the last subscription (ie last iteration over simpleCartList)
            if (i == this.simpleCartList.length - 1) {
              this.generateCartList(this.listOfProducts);
            }
          },
          error: (err: Error) => this.errorHandlerService.handleError(err)
        })
      }
    }
  }

  addToCart = (product: IProduct, quantity: number): void => {
    // Sanity checks
    if (quantity <= 0) quantity = 1;
    if (!product.stock) {
      this.popup.error({ text: "This product is out of stock." });
      return;
    }

    // Generate CartItem and SimpleCartItem objects by using provided Product and quantity
    let newCartItem: ICartItem = { product, quantity };
    let newSimpleCartItem: ISimpleCartItem = { productId: product.id, quantity };

    this.addItemsToCartLists(newCartItem, newSimpleCartItem);
    this.saveCartState();
    this.showSuccessSnackbar();
  }

  removeFromCart = (index: number) => {
    this.removeFromCartList(index);
    this.removeFromSimpleCartList(index);

    this.saveCartState();
  };

  generateCartList(data: IProduct[]) {
    if (this.cartList.length == 0 && data && data.length) {
      for (let i = 0; i < data.length; i++) {
        this.addItemToCartList({ product: data[i], quantity: this.simpleCartList[i].quantity });
      }
    }
  }

  private removeFromCartList(index: number) {
    let current = this.cartListSubject.getValue();
    current.splice(index, 1);
    this.cartListSubject.next(current);
  }

  private removeFromSimpleCartList(index: number) {
    let current = this.simpleCartListSubject.getValue();
    current.splice(index, 1);
    this.simpleCartListSubject.next(current);
  }

  updateItemQuantity = (index: number, newQuantity: number) => {
    let oldQuantity: number = this.cartList[index].quantity;
    this.cartList[index].quantity = newQuantity;
    this.simpleCartList[index].quantity = newQuantity;

    if (newQuantity > oldQuantity)
      this.subtotal += this.cartList[index].product.price;
    else if (newQuantity < oldQuantity)
      this.subtotal -= this.cartList[index].product.price;

    this.saveCartState();
  };

  calculateTotal(shippingCost: number): number {
    return this.subtotal - this.promoDeduction + shippingCost;
  }

  private addItemsToCartLists(newCartItem: ICartItem, newSimpleCartItem: ISimpleCartItem) {
    // If this exact product already exists in the cart --> only update its CartItem quantity | Otherwise, add the new CartItem to the list.

    // normal cart list
    this.addItemToCartList(newCartItem);
    // simple cart list
    this.addItemToSimpleCartList(newSimpleCartItem);
  }

  private addItemToCartList(newCartItem: ICartItem) {
    let currentStateOfCart = this.cartListSubject.getValue();
    let thisItemPositionInCart = currentStateOfCart.find(cartItem => cartItem.product.title === newCartItem.product.title);
    if (thisItemPositionInCart)
      thisItemPositionInCart.quantity += newCartItem.quantity;
    else
      currentStateOfCart.push(newCartItem);
    this.cartListSubject.next(currentStateOfCart);
  }

  private addItemToSimpleCartList(newSimpleCartItem: ISimpleCartItem) {
    let currentStateOfCart = this.simpleCartListSubject.getValue();
    let thisItemPositionInCart = currentStateOfCart.find(simpleCartItem => simpleCartItem.productId === newSimpleCartItem.productId);
    if (thisItemPositionInCart)
      thisItemPositionInCart.quantity += newSimpleCartItem.quantity;
    else
      currentStateOfCart.push(newSimpleCartItem);
    this.simpleCartListSubject.next(currentStateOfCart);
  }

  private saveCartState() {
    sessionStorage.setItem("shoppingCart", JSON.stringify(this.simpleCartListSubject.getValue()));
  }

  public retreiveSavedCartState = () => {
    let storedValue: string | null = sessionStorage.getItem('shoppingCart');

    if (storedValue) {
      try {
        this.simpleCartList = JSON.parse(storedValue!) as ISimpleCartItem[];
      } catch (e) {
        sessionStorage.removeItem('shoppingCart');
      }
    }
  }

  private showSuccessSnackbar = () => {
    this.matSnackBar
      .open("Added to the shopping cart.", "View cart", { duration: 4000 })
      .afterDismissed().subscribe(info => {
        if (info.dismissedByAction === true) {
          this.router.navigate(['/cart']);
        }
      });
  }
}
