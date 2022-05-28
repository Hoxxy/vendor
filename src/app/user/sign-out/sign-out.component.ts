import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class UserSignOutComponent implements OnInit {

  constructor(private router: Router, private loaderService: LoaderService, private userService: UserService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loaderService.dismiss();
    }, 1000);

    if (this.userService.isUserSignedIn) {
      this.userService.signOut();
    }
    else {
      this.router.navigate(["/"]);
    }
  }

}
