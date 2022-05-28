import { Injectable, OnInit } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { PopupService } from '../../utils/popup.service';
import { UtilsService } from '../../utils/utils.service';
import { TokenStorageService } from './token-storage.service';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth: Auth = getAuth();
  private userData: User | null | undefined;

  private signedInStatus: boolean = false;

  constructor(private tokenStorageService: TokenStorageService, private popup: PopupService, private utils: UtilsService) {
    this.updateSignedInStatus();
    this.initializeUser();
  }

  get getAuth(): Auth {
    return this.auth;
  }

  setUserData = (data: User | null): void => {
    this.userData = data;

    let signedin = localStorage.getItem('signedin');
    if (signedin == null) {
      if (this.isUserSignedIn) {
        localStorage.setItem('signedin', '1');
      }
      else {
        localStorage.setItem('signedin', '0');
      }
    }
    else {
      if (this.isUserSignedIn && signedin == '0') {
        localStorage.setItem('signedin', '1');
      }
      else if (!this.isUserSignedIn && signedin == '1') {
        localStorage.setItem('signedin', '0');
      }
    }
  }

  get isUserResolved(): boolean {
    return this.userData !== undefined;
  }

  get getUserData(): User | null | undefined {
    return this.userData;
  }

  get getUID(): string | null {
    if (this.userData?.uid !== null) {
      return this.userData!.uid;
    }
    else return null;
  }

  get isUserSignedIn(): boolean {
    return this.signedInStatus;
  }

  initializeUser() {
    onAuthStateChanged(this.getAuth, (user) => {
      if (user) {
        this.setUserData(user);
      }
      else this.setUserData(null);
    });
  }

  updateSignedInStatus = (): void => {
    this.signedInStatus = !!this.tokenStorageService.getToken();
  }

  signOut = (): void => {
    this.tokenStorageService.signOut();
    this.updateSignedInStatus();
    this.popup.success({text: "You are signed out.", navigateTo: "/"});
  }
}
