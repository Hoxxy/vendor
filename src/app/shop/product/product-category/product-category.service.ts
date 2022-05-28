import { Injectable } from '@angular/core';
import { IProductCategory } from './product-category.model';

@Injectable()
export class ProductCategoryService {
  public productCategoriesList: IProductCategory[] = [];

  constructor() { }

  createListOfProductCategories = (data: IProductCategory[]): void => {
    this.productCategoriesList = data;
  }

  getListOfProductCategories = (): IProductCategory[] => {
    return this.productCategoriesList;
  }
}
