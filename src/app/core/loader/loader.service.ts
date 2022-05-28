import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get isPageLoading() {
    return this.isLoading;
  }

  dismiss = () => {
    this.isLoading.next(false);
  }

  show = () => {
    this.isLoading.next(true);
  }
}
