import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductCategory } from '../shop/product/product-category/product-category.model';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:1313/api/product_category';

@Injectable()
export class ProductCategoryServiceApi {
  constructor(public httpClient: HttpClient) { }

  loadProductCategories = (): Observable<IProductCategory[]> => {
    return this.httpClient.get<IProductCategory[]>(`${API_URL}/list`);
  }

  findProductCategory = (id: number): Observable<IProductCategory> => {
    return this.httpClient.get<IProductCategory>(`${API_URL}/find/${id}`);
  }
}
