import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/loader/loader.service';
import { User } from './user/user.model';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'vendor2';

  constructor (public loaderService: LoaderService) {}

  ngOnInit(): void {}
}
