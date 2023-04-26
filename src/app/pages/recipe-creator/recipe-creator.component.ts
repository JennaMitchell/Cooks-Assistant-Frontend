import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  recipeCreatorBackgroundPopupActiveSelector,
  recipeTagsPopupActiveSelector,
  recipeChangeImagePopupActiveSelector,
} from 'libs/store/popups/popup-selectors';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import {
  selectedRecipeCreatorBackground,
  selectedTemplateIndexSelector,
} from 'libs/store/recipe-creator/recipe-creator-selectors';
import { backgroundImageData } from 'src/app/constants/constants';
import { changeRecipeTemplatePopupActiveSelector } from 'libs/store/popups/popup-selectors';
import { loggedInSelector } from 'libs/store/auth/auth-selectors';

@Component({
  selector: 'recipe-creator',
  templateUrl: './recipe-creator.component.html',
  styleUrls: ['./recipe-creator.component.css'],
  providers: [],
})
export class RecipeCreatorComponent {
  constructor(private store: Store) {}

  hideEditButtonsActive = false;

  recipeChangeImagePopupActiveObserver$ = this.store.select(
    recipeChangeImagePopupActiveSelector
  );
  recipeChangeImagePopupActive = false;

  tagsPopupActiveObserver$ = this.store.select(recipeTagsPopupActiveSelector);
  tagsPopupActive = false;

  backgroundChangerActiveObserver$ = this.store.select(
    recipeCreatorBackgroundPopupActiveSelector
  );
  backgroundChangerActiveValue = false;
  loggedInObserver$ = this.store.select(loggedInSelector);
  loggedIn = false;

  selectedTemplateIndexSelectorObserver$ = this.store.select(
    selectedTemplateIndexSelector
  );
  selectedTemplateIndexSelector = 0;

  selectedBackgroundIndexObserver$ = this.store.select(
    selectedRecipeCreatorBackground
  );

  changeRecipeTemplatePopupActiveObserver$ = this.store.select(
    changeRecipeTemplatePopupActiveSelector
  );
  changeRecipeTemplatePopupActive = false;

  recipeCreatorBackgroundPopupActiveSelectorObserver$ = this.store.select(
    recipeCreatorBackgroundPopupActiveSelector
  );
  recipeCreatorBackgroundPopupActiveValue = false;

  selectedBackgroundAltText = '';
  selectedBackgroundImageUrl = '';

  backgroundButtonHover = false;
  recipeCardHover = false;

  hideEditButtonsButtonhandler() {
    this.hideEditButtonsActive = !this.hideEditButtonsActive;
  }

  backgroundButtonHoverHandler() {
    this.backgroundButtonHover = !this.backgroundButtonHover;
  }
  backgroundButtonHandler() {
    this.store.dispatch(
      PopupActions.updateRecipecreatorbackgroundpopupactive({
        recipeCreatorBackgroundPopupActive: true,
      })
    );
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
  }

  recipeCardButtonHoverHandler() {
    this.recipeCardHover = !this.recipeCardHover;
  }

  changeTemplateButtonHandler() {
    this.store.dispatch(
      PopupActions.updateChangerecipetemplatepopupactive({
        changeRecipeTemplatePopupActive: true,
      })
    );
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
  }

  ngOnInit() {
    this.backgroundChangerActiveObserver$.subscribe((value) => {
      this.backgroundChangerActiveValue = value;
    });
    this.selectedBackgroundIndexObserver$.subscribe((value) => {
      this.selectedBackgroundAltText = backgroundImageData[+value].altText;
      this.selectedBackgroundImageUrl = backgroundImageData[+value].imageUrl;
    });

    this.recipeCreatorBackgroundPopupActiveSelectorObserver$.subscribe(
      (value) => {
        this.recipeCreatorBackgroundPopupActiveValue = value;
      }
    );

    this.selectedTemplateIndexSelectorObserver$.subscribe((value) => {
      this.selectedTemplateIndexSelector = value;
    });

    this.changeRecipeTemplatePopupActiveObserver$.subscribe((value) => {
      this.changeRecipeTemplatePopupActive = value;
    });

    this.loggedInObserver$.subscribe((value) => {
      this.loggedIn = value;
    });
    this.tagsPopupActiveObserver$.subscribe((value) => {
      this.tagsPopupActive = value;
    });
    this.recipeChangeImagePopupActiveObserver$.subscribe((value: boolean) => {
      this.recipeChangeImagePopupActive = value;
    });

    const backDropElement = document.getElementsByClassName(
      'recipe-creator-backdrop'
    )[0] as HTMLDivElement;
    const parentBackDropElement = backDropElement.parentElement as HTMLElement;
    parentBackDropElement.style.overflow = 'hidden';
  }
}
