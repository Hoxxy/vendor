import { Component, OnInit } from '@angular/core';
import { _isNumberValue } from '@angular/cdk/coercion';
import { ProductService } from './product/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from './product/product-category/product-category.service';
import { CartService } from './cart/cart.service';
import { ProductServiceApi } from '../api/product.api';
import { ErrorHandlerService } from '../utils/error-handler.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public productsFilterCriteria: {
    category: number | null,
    price: string | null
  } = {
    category: null,
    price: null
  };

  constructor(
    public productCategoryService: ProductCategoryService,
    public productService: ProductService,
    private productServiceApi: ProductServiceApi,
    public cartService: CartService,
    private route: ActivatedRoute,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    // Resolving product filters, then loading all products and displaying them according to the user's criteria of filtering
    this.route.queryParams.subscribe(param => {
      let filters = this.productService.parseSearchFilters({
        category: param['category'],
        price: param['price']
      });

      this.productServiceApi.filterProducts(filters).subscribe({
        next: (data: any) => {
          this.productService.createListOfProducts(data.data);
        },
        error: (err: Error) => this.errorHandlerService.handleError(err)
      });
    });
  }
}
