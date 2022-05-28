import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/api/auth.api';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { PopupService } from 'src/app/utils/popup.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class UserSignInComponent implements OnInit {

  signInForm!: FormGroup;
  isLoggedIn = false;
  roles: string[] = [];

  constructor(private router: Router,
    private popup: PopupService,
    private loaderService: LoaderService,
    private authAPI: AuthApiService,
    private formBuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private userService: UserService) {

    this.loaderService.dismiss();
  }

  ngOnInit(): void {
    this.signInFormInit();
  }

  onSubmit = () => {
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;

    if (email && password) {
      this.authAPI.signIn(email, password).subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          this.userService.updateSignedInStatus();

          this.popup.success({ text: "Sign in successful", navigateTo: "/" });
        },
        error: (err) => {
          this.popup.error({ text: err.error.message });
        }
      })
    }
    else {
      // error, null values
      this.popup.error({ text: "You must enter e-mail and password." });
    }
  }

  private signInFormInit = () => {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
