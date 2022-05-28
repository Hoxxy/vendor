import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from 'src/app/utils/utils.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  private errorMessage: string = '';

  constructor(private utils: UtilsService) { }
  handleError(error: any): void {
    this.errorMessage = error;
    this.show();
  }

  private errorOccurred: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  get hasErrorOccurred() {
    return this.errorOccurred;
  }

  get getErrorMessage() {
    return this.errorMessage;
  }

  dismiss = () => {
    this.errorOccurred.next(false);
  }

  show = () => {
    this.errorOccurred.next(true);

    Swal.fire({
      title: "Error",
      text: "An error has occurred while trying to retreive data.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Close",
      cancelButtonText: "Try Again"
    }).then((result) => {
      if (result.isDismissed) {
        this.errorOccurred.next(false);
        this.utils.reloadComponent();
      }
    });
  }
}
