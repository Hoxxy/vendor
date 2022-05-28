import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../shop/product/product.model';

const API_URL = 'http://localhost:1313/api/product';

@Injectable()
export class ProductServiceApi {
  constructor(public httpClient: HttpClient) { }

  count = (): Observable<any> => {
    return this.httpClient.get<any>(`${API_URL}/count`);
  }

  listProducts = (): Observable<IProduct[]> => {
    return this.httpClient.get<IProduct[]>(`${API_URL}/list`);
  }

  findProduct = (id: number): Observable<IProduct> => {
    return this.httpClient.get<IProduct>(`${API_URL}/find/${id}`);
  }

  filterProducts = (filters: any): Observable<IProduct[]> => {
    let body = {
      categoryId: filters.categoryId ?? null,
      minPrice: filters.minPrice ?? null,
      maxPrice: filters.maxPrice ?? null,
    };
    return this.httpClient.post<IProduct[]>(`${API_URL}/filter`, body);
  }
}

  //
  //     public updateProduct(productId: number, newData: Product): Promise<Product> {
  //         return this.httpClient.patch<Product>
  //           ("http://localhost:1313/vendor/product/update/" + productId, newData).toPromise();
  //     }
  //
  //     public deleteProduct(productId: number): Promise<any> {
  //         return this.httpClient.delete<any>
  //           ("http://localhost:1313/vendor/product/delete/" + productId).toPromise();
  //       }
  //
  //     public createNewProduct(newProduct: Product): Promise<Product> {
  //         console.log(newProduct.category);
  //         return this.httpClient.post<Product>
  //             ("http://localhost:1313/vendor/product/insert", newProduct).toPromise();
  //     }
  //
  //     public getProductsInCategory(categoryId: number): Promise<Array<Product>> {
  //         return this.httpClient.get<Array<Product>>
  //           ("http://localhost:1313/vendor/product/list/" + categoryId).toPromise();
  //     }
  //
  //     public findProduct(productId: number): Promise<Product> {
  //         return this.httpClient.get<Product>
  //           ("http://localhost:1313/vendor/product/find/" + productId).toPromise();
  //     }
