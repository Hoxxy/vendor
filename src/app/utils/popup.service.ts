import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilsService } from './utils.service';

@Injectable()
export class PopupService {
  RELOAD_COMPONENT: string = "__reload";

  constructor(private router: Router, private utils: UtilsService) { }

  error(data: { title?: string | "Error", text: string, navigateTo?: string }) {
    Swal.fire({
      title: data.title? data.title : "Error",
      text: data.text,
      icon: "error",
      showCancelButton: false,
      confirmButtonText: "OK",
    }).then(() => {
      if (data.navigateTo) {
        this.router.navigate([data.navigateTo]);
      }
    });
  }

  success(data: { title?: string | "Success", text: string, navigateTo?: string | null }) {
    Swal.fire({
      title: data.title? data.title : "Success",
      text: data.text,
      icon: "success",
      showCancelButton: false,
      confirmButtonText: "OK",
    }).then(() => {
      if (data.navigateTo) {
        if (data.navigateTo === this.RELOAD_COMPONENT) {
          this.utils.reloadComponent();
        }
        else {
          this.router.navigate([data.navigateTo]);
        }
      }
    });
  }
}
