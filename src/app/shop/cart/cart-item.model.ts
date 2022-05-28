import { IProduct } from "../product/product.model";

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface ISimpleCartItem {
  productId: number;
  quantity: number;
}
