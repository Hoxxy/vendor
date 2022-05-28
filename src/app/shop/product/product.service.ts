import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/shop/product/product.model';
import { IProductCategory } from './product-category/product-category.model';
import { _isNumberValue } from '@angular/cdk/coercion';
import { PopupService } from 'src/app/utils/popup.service';


@Injectable()
export class ProductService {
  public listOfProducts: IProduct[] = [];

  product!: IProduct;
  category!: IProductCategory;

  constructor(private popupService: PopupService) { }

  setupProduct = (product: any): { product: IProduct, category: IProductCategory } => {
    this.product = {
      id: product.id,
      title: product.title,
      category: product.product_category.id,
      categoryName: product.product_category.title,
      price: product.price,
      description: product.description,
      image: `./assets/images/product-${product.id}.jpg`,
      stock: product.stock,
    };

    this.category = {
      id: product.product_category.id,
      title: product.product_category.title,
    };

    return { product: this.product, category: this.category };
  }

  parseSearchFilters = (filters: any) => {
    filters = {
      category: _isNumberValue(filters.category)? (<number><unknown>filters.category) : null,
      minPrice: (filters.price === 'premium')? 200 : 0,
      maxPrice: (filters.price === 'budget')? 200 : Number.MAX_SAFE_INTEGER,
    }
    delete filters.price;

    return filters;
  }

  createListOfProducts = (products: IProduct[]): void => {
    this.listOfProducts.length = 0;

    products.forEach(product => {
      this.listOfProducts.push(this.setupProduct(product).product);
    });

    if (this.listOfProducts.length == 0) {
      this.popupService.error({ text: "No products were found that match your criteria.", navigateTo: "/shop" });
    }
  }

  // getListOfProducts = (): IProduct[] => {
  //   return this.listOfProducts;
  // }
}
