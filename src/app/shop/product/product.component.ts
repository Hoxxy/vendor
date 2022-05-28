import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { ProductServiceApi } from 'src/app/api/product.api';
import { ErrorHandlerService } from 'src/app/utils/error-handler.service';
import { CartService } from '../cart/cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  // productPurchased: boolean = false;
  // productHasReviews: boolean = true;

  quantity: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private productServiceApi: ProductServiceApi,
    public cartService: CartService,
    private errorHandlerService: ErrorHandlerService) { }

  ngOnInit(): void {
    let productId: number = this.activatedRoute.snapshot.params['id'];

    this.productServiceApi.findProduct(productId).pipe(take(1)).subscribe({
      next: (product: any) => {
        this.productService.setupProduct(product.data);
      },
      error: (err: Error) => this.errorHandlerService.handleError(err)
    })
  }

  changeQuantity = (newQuantity: number) => {
    this.quantity = newQuantity;
  };

  openReviewDialog = () => { }
}
