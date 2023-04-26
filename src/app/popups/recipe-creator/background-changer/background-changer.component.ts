import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { RecipeCreatorActions } from 'libs/store/recipe-creator/recipe-creator-actions.actions';
import { backgroundImageData } from 'src/app/constants/constants';
@Component({
  selector: 'background-changer-popup',
  templateUrl: './background-changer.component.html',
  styleUrls: ['./background-changer.component.css'],
  providers: [],
})
export class BackgroundChangerPopupComponent {
  constructor(private store: Store) {}
  importedBackgroundImageDate = backgroundImageData;
  activeButton = -1;
  submitButtonEnabled = false;

  submitButtonHoverHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLButtonElement;
    if (!targetElement.disabled) {
      targetElement.classList.toggle(
        'background-changer-submit-button-active-hover'
      );
    }
  }

  closingButtonHandler = () => {
    this.store.dispatch(
      PopupActions.updateRecipecreatorbackgroundpopupactive({
        recipeCreatorBackgroundPopupActive: false,
      })
    );
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
  };

  imageButtonHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLButtonElement;
    let targetId = targetElement.id;
    let splitId = targetId.split('-');

    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLButtonElement;
      targetId = targetElement.id;

      splitId = targetId.split('-');
    }

    this.activeButton = +splitId[splitId.length - 1];

    for (
      let indexOfImportedData = 0;
      indexOfImportedData < this.importedBackgroundImageDate.length;
      indexOfImportedData++
    ) {
      const elementToReset = document.getElementById(
        this.importedBackgroundImageDate[indexOfImportedData].id
      ) as HTMLButtonElement;

      elementToReset.classList.remove(
        'background-changer-background-choice-button-active'
      );
    }

    targetElement.classList.toggle(
      'background-changer-background-choice-button-active'
    );
    this.submitButtonEnabled = true;
  }

  submitButtonHandler() {
    this.store.dispatch(
      RecipeCreatorActions.updateBackgroundselected({
        selectedBackground: this.activeButton,
      })
    );
    this.closingButtonHandler();
  }
}
