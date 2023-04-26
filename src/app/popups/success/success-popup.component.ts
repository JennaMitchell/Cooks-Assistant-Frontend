import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';

import { successPopupTextSelector } from 'libs/store/popups/popup-selectors';
@Component({
  selector: 'success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.css'],
  providers: [],
})
export class SuccessPopupComponent {
  constructor(private store: Store) {}
  successPopupMessageObserver$ = this.store.select(successPopupTextSelector);
  successMessageFromStore: any;
  closingButtonHandler() {
    this.store.dispatch(
      PopupActions.updateSuccesspopupactive({ successPopupActive: false })
    );
  }
  ngOnInit() {
    this.successPopupMessageObserver$.subscribe((value) => {
      this.successMessageFromStore = value;
    });
  }
}
