import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { UserApiService } from 'src/app/api/user.api';
import { LoaderService } from 'src/app/core/loader/loader.service';
import { GenericValidator } from 'src/app/utils/generic-validator';
import { PopupService } from 'src/app/utils/popup.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {

  displayMessage: { [key: string]: string } = {};
  editProfileCredentialsForm!: FormGroup;
  editAddressForm!: FormGroup;
  private genericValidator!: GenericValidator;
  private validationMessages!: { [key: string]: { [key: string]: string } };

  constructor(
    private loaderService: LoaderService,
    private popup: PopupService,
    private formBuilder: FormBuilder,
    private userApi: UserApiService
  ) {
    this.setupValidationMessages();
  }

  ngOnInit(): void {
    this.editProfileCredentialsFormInit();
    this.editAddressFormInit();

    this.loadProfileDataAndPatchForms();
  }
  private loadProfileDataAndPatchForms = (): void => {
    this.userApi.loadProfile().subscribe({
      next: (response) => {
        this.patchForms(response.data);
      },
      error: (err) => {
        this.popup.error({ text: err.error.message });
      },
      complete: () => {
        this.loaderService.dismiss();
      }
    });
  }

  private editProfileCredentialsFormInit = (): void => {
    this.editProfileCredentialsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirm: ['', [Validators.required, this.genericValidator.passwordMatcher]],
      }, { validators: [Validators.required, this.genericValidator.passwordMatcher] })
    });

    this.editProfileCredentialsForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(data => {
      this.displayMessage = this.genericValidator.processMessages(this.editProfileCredentialsForm);
    });
  }

  private editAddressFormInit = (): void => {
    this.editAddressForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(3)]],
      postcode: ['', [Validators.required]],
      address1: ['', [Validators.required]],
      address2: ['']
    });

    this.editAddressForm.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(data => {
      this.displayMessage = this.genericValidator.processMessages(this.editAddressForm);
    });
  }

  private patchForms = (userData: any): void => {
    this.editProfileCredentialsForm.patchValue({
      email: userData.email
    });

    this.editAddressForm.patchValue({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      city: userData.city,
      postcode: userData.postcode,
      address1: userData.address1,
      address2: userData.address2
    });
  }

  onSubmitCredentials = (): void => {
    const data = {
      email: this.editProfileCredentialsForm.get('email')?.value,
      password: this.editProfileCredentialsForm.get('password')?.value
    };

    this.userApi.update(data).subscribe({
      next: (data: any) => {
        this.popup.success({ text: "User credentials edited successfully" });
      },
      error: (err) => {
        this.popup.error({ text: err.error.message });
      }
    })
  }

  onSubmitAddress = (): void => {
    const data = {
      firstName: this.editAddressForm.get('firstName')?.value,
      lastName: this.editAddressForm.get('lastName')?.value,
      phone: this.editAddressForm.get('phone')?.value,
      city: this.editAddressForm.get('city')?.value,
      postcode: this.editAddressForm.get('postcode')?.value,
      address1: this.editAddressForm.get('address1')?.value,
      address2: this.editAddressForm.get('address2')?.value,
    };

    this.userApi.update(data).subscribe({
      next: (data: any) => {
        this.popup.success({ text: "Address edited successfully" });
      },
      error: (err) => {
        this.popup.error({ text: err.error.message });
      }
    })
  }

  setupValidationMessages = (): void => {
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
