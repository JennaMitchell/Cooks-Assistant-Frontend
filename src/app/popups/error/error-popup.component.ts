import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
// import { RecipeCreatorActions } from 'libs/store/recipe-creator/recipe-creator-actions.actions';
// import { backgroundImageData } from 'src/app/constants/constants';
import { errorMessageSelector } from 'libs/store/popups/popup-selectors';
@Component({
  selector: 'error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css'],
  providers: [],
})
export class ErrorPopupComponent {
  constructor(private store: Store) {}
  errorPopupMessageObserver$ = this.store.select(errorMessageSelector);
  errorMessageFromStore: any;
  closingButtonHandler() {
    this.store.dispatch(
      PopupActions.updateErrorpopupactive({ errorPopupActive: false })
    );
  }
  ngOnInit() {
    this.errorPopupMessageObserver$.subscribe((value) => {
      this.errorMessageFromStore = value;
    });
  }
}
