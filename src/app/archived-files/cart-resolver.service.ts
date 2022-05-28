import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { from, Observable, of, zip } from "rxjs";
import { ProductServiceApi } from "src/app/api/product-api.service";
import { IProduct } from "../shop/product/product.model";
import { ISimpleCartItem } from "../shop/cart/cart-item.model";

@Injectable()
export class CartResolver implements Resolve<any> {
  private simpleCartList: ISimpleCartItem[] = [];

  constructor(private productServiceAPI: ProductServiceApi) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct[] | IProduct | null> {
    this.retreiveSavedCartState();

    let simpleCartList$ = from(this.simpleCartList);
    let products: Observable<IProduct>[] = [];

    if (this.simpleCartList.length == 0) {
      return of(null);
    }

    simpleCartList$.forEach((simpleCartItem) => {
      this.productServiceAPI.findProduct(simpleCartItem.productId).pipe(
        productData => {
          products.push(productData);
          return productData;
        }
      )
    });
    return zip(products);
  }

  private retreiveSavedCartState(): boolean {
    let storedValue: string | null = sessionStorage.getItem('shoppingCart');

    if (storedValue) {
      try {
        this.simpleCartList = JSON.parse(storedValue!) as ISimpleCartItem[];
        return true;
      } catch (e) {
        sessionStorage.removeItem('shoppingCart');
        return false;
      }
    }
    return false;
  }

}
