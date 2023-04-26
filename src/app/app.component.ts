import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  errorPopupActiveSelector,
  lockWebpageViewPortSelector,
  refreshWarningPopupActiveSelector,
  successPopupActiveSelector,
} from 'libs/store/popups/popup-selectors';
import {
  loginPopupActiveSelector,
  signupPopupActiveSelector,
} from 'libs/store/popups/popup-selectors';

import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { loggedInSelector } from 'libs/store/auth/auth-selectors';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private store: Store, private router: Router) {}
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    if (this.loggedIn) {
      event.preventDefault();
      this.store.dispatch(
        PopupActions.updateRefreshwarningpopupactive({
          refreshWarningPopupActive: true,
        })
      );
      this.store.dispatch(
        PopupActions.updateLockwebpageviewport({ lock: true })
      );
    }
  }
  title = 'Cooks Assistant';
  lockWebpageViewPortSelectorObserver$ = this.store.select(
    lockWebpageViewPortSelector
  );
  loginPopupActiveObserver$ = this.store.select(loginPopupActiveSelector);
  signupPopupActiveObserver$ = this.store.select(signupPopupActiveSelector);
  routerObserver$ = this.router.events;
  loggedInObserver$ = this.store.select(loggedInSelector);
  refreshWarningPopupActiveObserver$ = this.store.select(
    refreshWarningPopupActiveSelector
  );
  errorMessagePopupActiveObserver$ = this.store.select(
    errorPopupActiveSelector
  );
  successMessagePopupActiveObserver$ = this.store.select(
    successPopupActiveSelector
  );

  loggedIn = false;
  refreshWarningPopupActive = false;
  signupPopupActive = false;
  loginPopupActive = false;
  redirectToHome = false;
  userLoggedIn = false;
  errorMessagePopupActive = false;
  successMessagePopupActive = false;

  ngOnInit() {
    this.lockWebpageViewPortSelectorObserver$.subscribe((value) => {
      if (value) {
        window.scrollTo(0, 0);
        document
          .getElementsByTagName('body')[0]
          .classList.add('app-lock-viewport');
      } else {
        if (
          document
            .getElementsByTagName('body')[0]
            .classList.contains('app-lock-viewport')
        ) {
          document
            .getElementsByTagName('body')[0]
            .classList.remove('app-lock-viewport');
        }
      }
    });

    this.loginPopupActiveObserver$.subscribe((value) => {
      this.loginPopupActive = value;
    });
    this.signupPopupActiveObserver$.subscribe((value) => {
      this.signupPopupActive = value;
    });
    this.loggedInObserver$.subscribe((value) => {
      this.loggedIn = value;
    });
    this.refreshWarningPopupActiveObserver$.subscribe((value) => {
      this.refreshWarningPopupActive = value;
    });
    this.errorMessagePopupActiveObserver$.subscribe((value) => {
      this.errorMessagePopupActive = value;
    });
    this.successMessagePopupActiveObserver$.subscribe((value) => {
      this.successMessagePopupActive = value;
    });
  }
  ngAfterViewChecked() {
    if (this.redirectToHome) {
      this.router.navigateByUrl('/');
      this.redirectToHome = false;
    }
  }
}
