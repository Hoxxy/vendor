import { Component, OnInit, } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from 'src/app/utils/popup.service';
import { AuthApiService } from '../../api/auth.api';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { GenericValidator } from 'src/app/utils/generic-validator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  displayMessage: { [key: string]: string } = {};
  signUpForm!: FormGroup;
  private genericValidator!: GenericValidator;
  private validationMessages!: { [key: string]: { [key: string]: string } };

  constructor(
    private formBuilder: FormBuilder,
    private popup: PopupService,
    private loaderService: LoaderService,
    private authApi: AuthApiService
  ) {
    this.loaderService.dismiss();
    this.setupValidationMessages();
  }

  ngOnInit(): void {
    this.signUpFormInit();
  }

  private signUpFormInit = () => {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required, this.genericValidator.passwordMatcher]],
      }, { validators: [this.genericValidator.passwordMatcher, Validators.required] }),
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      postcode: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['']
    });

    this.signUpForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(data => {
      this.displayMessage = this.genericValidator.processMessages(this.signUpForm);
    });
  }

  onSubmit = (): void => {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('passwordGroup.password')?.value;
    const profileData = {
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      phone: this.signUpForm.get('phone')?.value,
      city: this.signUpForm.get('city')?.value,
      postcode: this.signUpForm.get('postcode')?.value,
      address1: this.signUpForm.get('address1')?.value,
      address2: this.signUpForm.get('address2')?.value,
    };

    this.authApi.signUp(email, password, profileData).subscribe({
      next: (data: any) => {
        this.popup.success({ text: "Sign Up successful" });
      },
      error: (err) => {
        this.popup.error({ text: err.error.message });
      }
    })
  }

  get isUserSignedIn(): boolean {
    const storedUserInfo = localStorage.getItem('user');
    let userInfo: string | null = null;

    if (storedUserInfo !== null)
      userInfo = JSON.parse(storedUserInfo);

    return (userInfo !== null);
  }

  private setupValidationMessages = (): void => {
    this.validationMessages = {
      email: {
        required: 'E-mail is required.',
        email: 'Please enter a valid e-mail address.'
      },
      password: {
        required: 'Password is required.',
        minlength: 'Password must contain at least 6 characters.',
      },
      passwordGroup: {
        match: 'Passwords do not match.'
      },
      firstName: {
        required: 'First name is required.',
        minlength: 'First name must contain at least 3 characters.',
      },
      lastName: {
        required: 'Last name is required.',
        minlength: 'Last name must contain at least 3 characters.',
      },
      city: {
        required: 'City is required.',
        minlength: 'City name must contain at least 3 characters.',
      },
      postcode: {
        required: 'Postcode is required.',
      },
      phone: {
        required: 'Phone number is required.',
      },
      address1: {
        required: 'Address is required.',
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }
}
