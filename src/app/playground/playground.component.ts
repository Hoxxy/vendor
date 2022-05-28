import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, of, pipe, zip } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductServiceApi } from '../api/product.api';
import { ProductCategoryServiceApi } from '../api/product-category.api';
import { LoaderService } from '../core/loader/loader.service';
import { PopupService } from '../utils/popup.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response',
  responseType: 'json'
};

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {


  constructor(private loaderService: LoaderService, private popup: PopupService, private httpClient: HttpClient) {
    setTimeout(() => {
      this.loaderService.dismiss();
    }, 100);
  }

  ngOnInit(): void {
    // this.productServiceAPI.findProduct(1).pipe(
    //   productData => forkJoin([
    //     of(productData),
    //     of(this.productCategoryServiceAPI.findProductCategory(1))
    //   ])
    // ).subscribe(data => {
    //   data[0].subscribe(product => console.log(product));
    //   data[1].subscribe(productCategory => console.log(productCategory));
    // })
  }

  btnclick() {
    this.httpClient.post('http://localhost:2323/api/sandbox/test/2', httpOptions).subscribe({
      next: (data: any) => console.log(data),
      error: (err: any) => console.log(err)
    })
  }

}
