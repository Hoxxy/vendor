import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../core/loader/loader.service';

@Component({
  template: `
    <div class="container">
      <h1>Welcome to VENDOR.</h1>
      <p>Use the navigation bar to go through the online store.</p>
    </div>
  `,
  styles: [`
      .container {
        text-align: center;
        margin: 60px;
      }
    `,
  ],
})
export class HomepageComponent implements OnInit {
  constructor(private loaderService: LoaderService) {
    setTimeout(() => {
      this.loaderService.dismiss();
    }, 1000);
  }

  ngOnInit() {

  }
}
