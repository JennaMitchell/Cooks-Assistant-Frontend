import { Component } from '@angular/core';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'logged-out-nav-bar',
  templateUrl: './logged-out-nav-bar.component.html',
  styleUrls: ['./logged-out-nav-bar.component.css'],
})
export class LoggedOutNavBar {
  constructor(private store: Store, private router: Router) {}
  loginButtonHover = false;
  registerButtonHover = false;
  homeButtonHover = false;

  onLoginButtonHover() {
    this.loginButtonHover = !this.loginButtonHover;
  }
  onRegisterButtonHover() {
    this.registerButtonHover = !this.registerButtonHover;
  }
  onHomeButtonHover() {
    this.homeButtonHover = !this.homeButtonHover;
  }

  homeButtonClickHandler() {
    this.router.navigate(['/']);
  }

  loginButtonHandler() {
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
    this.store.dispatch(
      PopupActions.updateLoginpopupactive({ loginPopupActive: true })
    );
  }
  signupButtonHandler() {
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
    this.store.dispatch(
      PopupActions.updateSignuppopupactive({ signupPopupActive: true })
    );
  }

  ngOnInit() {}
}
