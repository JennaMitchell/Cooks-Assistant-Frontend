import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class ActivatePopupService {
  constructor(private store: Store) {}
  activateRecipeCreatorDishImagePopup() {
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
    this.store.dispatch(
      PopupActions.updateRecipechangeimagepopupactive({
        recipeChangeImagePopupActive: true,
      })
    );
  }

  errorPopupHandler(message: string) {
    this.store.dispatch(
      PopupActions.updateErrorpopupactive({ errorPopupActive: true })
    );
    this.store.dispatch(
      PopupActions.updateErrormessage({ errorMessage: message })
    );
  }

  successPopupHandler(message: string) {
    this.store.dispatch(
      PopupActions.updateSuccesspopupactive({ successPopupActive: true })
    );
    this.store.dispatch(
      PopupActions.updateSuccesspopuptext({ successPopupText: message })
    );
  }

  searchPopupActiveHandler() {
    this.store.dispatch(
      PopupActions.updateSearchpopupactive({ searchPopupActive: true })
    );
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
  }
  homepageCategoryPopupHandler() {
    this.store.dispatch(
      PopupActions.updateHomepagecategorypopupactive({
        homepageCategoryPopupActive: true,
      })
    );
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
  }
}
