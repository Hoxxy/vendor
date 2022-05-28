import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map, mergeMap, Observable, take, tap } from "rxjs";
import { ProductServiceApi } from "src/app/api/product.api";
import { ProductCategoryServiceApi } from "src/app/api/product-category.api";
import { IProductCategory } from "../shop/product/product-category/product-category.model";
import { IProduct } from "../shop/product/product.model";

@Injectable()
export class ProductResolver implements Resolve<any> {
  constructor(private productServiceAPI: ProductServiceApi, private productCategoryServiceAPI: ProductCategoryServiceApi) { }

  resolve(route: ActivatedRouteSnapshot): Observable<(IProduct | IProductCategory)[]> {
    return this.productServiceAPI.findProduct(route.params['id']).pipe(
      take(1),
      mergeMap(productData =>
        this.productCategoryServiceAPI.findProductCategory(productData.category).pipe(
          take(1),
          map(productCategoryData => [productData, productCategoryData])
        )
      )
    );
  }
}



// return forkJoin([
    //   from(this.productServiceAPI.findProduct(route.params['id'])),
    //   from(this.productCategoryServiceAPI.findProductCategory(1))
    // ]);


/*
export class ProductResolver implements Resolve<any> {
  constructor(private productServiceAPI: ProductServiceAPI, private productCategoryServiceAPI: ProductCategoryServiceAPI) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let retrunData_Product: any;
    let returnData_ProductCategory: any;
    this.productServiceAPI.findProduct(route.params['id']).pipe(
      productData => forkJoin([
        of(productData),
        of(this.productCategoryServiceAPI.findProductCategory(1))
      ])
    ).subscribe(data => {
      retrunData_Product = data[0];
      returnData_ProductCategory = data[1];
    })

    return forkJoin([from(retrunData_Product), from(returnData_ProductCategory)]);
  }
}
*/




/*
export class ProductResolver implements Resolve<any> {
  constructor(private productServiceAPI: ProductServiceAPI) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productServiceAPI.findProduct(route.params['id']);
  }
}
*/
