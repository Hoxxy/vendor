import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept = (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
    this.loaderService.show();

    return next.handle(req).pipe(
      // catchError(this.handleError),
      finalize(() => {
        this.loaderService.dismiss();
      })
    );
  }

//   handleError = (error: HttpErrorResponse) => {
//     let errorMessage: string = '';
//
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `TEEEEEEST${error.name} - ${error.statusText} (${error.status})\nDetails: ${error.message}`;
//     }
//     // return an observable with a user-facing error message
//     return throwError(() => new Error(errorMessage));
//   }
}

export const loaderInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
];
