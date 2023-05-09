import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';

import { termsOfServicePopupActiveSelector } from 'libs/store/popups/popup-selectors';
@Component({
  selector: 'terms-of-service-popup',
  templateUrl: './terms-of-service-popup.component.html',
  styleUrls: ['./terms-of-service-popup.component.css'],
  providers: [],
})
export class TermsOfServicePopupComponent {
  constructor(private store: Store) {}
  termsOfServicePopupActiveObserver$ = this.store.select(
    termsOfServicePopupActiveSelector
  );
  termsOfServicePopupActive = false;
  closingButtonHandler() {
    this.store.dispatch(
      PopupActions.updateTermsofservicepopupactive({
        termsOfServicePopupActive: false,
      })
    );
  }
  ngOnInit() {
    this.termsOfServicePopupActiveObserver$.subscribe((value) => {
      this.termsOfServicePopupActive = value;
    });
  }
}
