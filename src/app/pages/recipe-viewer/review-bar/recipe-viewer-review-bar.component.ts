import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loggedInSelector,
  recipesMadeIdsArraySelector,
  recipesRatedIdsArraySelector,
} from 'libs/store/auth/auth-selectors';

import { RecipeDataApiCalls } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { UserRatedRecipeEntryInterface } from 'libs/store/auth/auth-reducers';
import {
  usernameSelector,
  tokenSelector,
} from 'libs/store/auth/auth-selectors';
import { UserMakeRecipeEntryInterface } from 'libs/store/auth/auth-reducers';
@Component({
  selector: 'recipe-viewer-review-bar',
  templateUrl: './recipe-viewer-review-bar.component.html',
  styleUrls: ['./recipe-viewer-review-bar.component.css'],
  providers: [],
})
export class RecipeViewerReviewBar {
  constructor(
    private store: Store,
    private recipeDataApiCalls: RecipeDataApiCalls,
    private activatePopupService: ActivatePopupService
  ) {}
  @Input('recipeData') recipeData = {
    title: '',
    quote: '',
    servings: '',
    prepTime: '',
    cookingTime: '',
    ingredientsList: [''],
    directionsList: [''],
    notes: [''],
    description: '',
    selectedRecipeDishImageIndex: 0,
    username: '',
    selectedTemplateIndex: 0,
    tags: [''],
    ratings: [0],
    numberOfMakes: 0,
    _id: '',
  };

  starButtonsIds = [
    'recipe-viewer-star-rating-0',
    'recipe-viewer-star-rating-1',
    'recipe-viewer-star-rating-2',
    'recipe-viewer-star-rating-3',
    'recipe-viewer-star-rating-4',
  ];

  recipesMadeIdsArrayObserver$ = this.store.select(recipesMadeIdsArraySelector);
  recipeMadesIdsArray: UserMakeRecipeEntryInterface[] = [];
  activeStarButtonsArray = [false, false, false, false, false];
  starButtonMouseClickEventOccured = false;
  starButtonIndexClicked = -1;
  makeButtonHoverActive = false;
  makeButtonActive = false;
  makeButtonClickEventOccured = false;
  loggedInObserver$ = this.store.select(loggedInSelector);
  loggedIn = false;
  usernameObserver$ = this.store.select(usernameSelector);
  username = '';
  userTokenObserver$ = this.store.select(tokenSelector);
  userToken = '';

  recipesRatedIdArrayObserver$ = this.store.select(
    recipesRatedIdsArraySelector
  );
  recipesRatedIdArray: UserRatedRecipeEntryInterface[] = [];

  xObserver$ = this.store.select(recipesRatedIdsArraySelector);

  ngOnInit() {
    this.loggedInObserver$.subscribe((value) => {
      this.loggedIn = value;
    });
    this.recipesRatedIdArrayObserver$.subscribe((value) => {
      this.recipesRatedIdArray = value;
    });

    this.usernameObserver$.subscribe((value) => {
      this.username = value;
    });
    this.userTokenObserver$.subscribe((value) => {
      this.userToken = value;
    });
    this.recipesMadeIdsArrayObserver$.subscribe((value) => {
      this.recipeMadesIdsArray = value;
    });
  }

  ngAfterContentInit() {
    this.activeStarButtonsArray = [];
    const tempActiveStarButtonsArray: boolean[] = [];
    // Extracting the previous user data
    let previousUserRating = -1;
    for (
      let indexOfRecipeMadesIdsArray = 0;
      indexOfRecipeMadesIdsArray < this.recipeMadesIdsArray.length;
      indexOfRecipeMadesIdsArray++
    ) {
      const selectedPreviousRecipeId =
        this.recipeMadesIdsArray[indexOfRecipeMadesIdsArray].recipeId;
      if (selectedPreviousRecipeId === this.recipeData._id) {
        this.makeButtonActive = true;
        break;
      }
    }
    for (
      let indexOfRecipesRatedIdArray = 0;
      indexOfRecipesRatedIdArray < this.recipesRatedIdArray.length;
      indexOfRecipesRatedIdArray++
    ) {
      const selectedPreviousRecipeId =
        this.recipesRatedIdArray[indexOfRecipesRatedIdArray].recipeId;
      if (selectedPreviousRecipeId === this.recipeData._id) {
        previousUserRating =
          this.recipesRatedIdArray[indexOfRecipesRatedIdArray].rating;
        break;
      }
    }

    if (previousUserRating !== -1) {
      for (
        let indexOfActiveStarButtonsArray = 0;
        indexOfActiveStarButtonsArray < this.activeStarButtonsArray.length;
        indexOfActiveStarButtonsArray++
      ) {
        if (previousUserRating > indexOfActiveStarButtonsArray) {
          tempActiveStarButtonsArray.push(true);
        } else {
          tempActiveStarButtonsArray.push(false);
        }
      }
      this.activeStarButtonsArray = tempActiveStarButtonsArray;
    }
  }

  getTargetElementIdIndex(event: Event) {
    let targetElement = event.target as HTMLElement;
    let targetId = targetElement.id;

    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLButtonElement;
      targetId = targetElement.id;
    }
    const splitId = targetId.split('-');
    const buttonIdIndex = +splitId[splitId.length - 1];
    return buttonIdIndex;
  }

  starButtonMouseEnterLeaveHandler(event: Event) {
    const buttonIdIndex = this.getTargetElementIdIndex(event);

    if (!this.starButtonMouseClickEventOccured) {
      this.activeStarButtonsArray[buttonIdIndex] =
        !this.activeStarButtonsArray[buttonIdIndex];
    }
  }

  async starButtonClickHandler(event: Event) {
    const buttonIdIndex = this.getTargetElementIdIndex(event);
    const tempActiveButtons = [false, false, false, false, false];
    const tempRecipeRatings = this.recipeData.ratings.slice();

    if (buttonIdIndex === this.starButtonIndexClicked) {
      this.activeStarButtonsArray = tempActiveButtons;
      this.starButtonIndexClicked = -1;
      tempRecipeRatings.splice(tempRecipeRatings.length - 1, 1);
      if (this.makeButtonActive) {
        this.makeButtonClickHandler();
      }
    } else if (this.starButtonIndexClicked !== -1) {
      for (
        let buttonIndex = 0;
        buttonIndex < +buttonIdIndex + 1;
        buttonIndex++
      ) {
        tempActiveButtons[buttonIndex] = true;
      }
      this.activeStarButtonsArray = tempActiveButtons;
      tempRecipeRatings[tempRecipeRatings.length - 1] = buttonIdIndex + 1;

      this.starButtonIndexClicked = buttonIdIndex;
      if (!this.makeButtonActive) {
        this.makeButtonClickHandler();
      }
    } else {
      for (
        let buttonIndex = 0;
        buttonIndex < +buttonIdIndex + 1;
        buttonIndex++
      ) {
        tempActiveButtons[buttonIndex] = true;
      }
      this.activeStarButtonsArray = tempActiveButtons;
      tempRecipeRatings.push(buttonIdIndex + 1);

      this.starButtonIndexClicked = buttonIdIndex;
      if (!this.makeButtonActive) {
        this.makeButtonClickHandler();
      }
    }
    this.recipeData.ratings = tempRecipeRatings;

    this.starButtonMouseClickEventOccured = true;

    if (this.userToken.length !== 0) {
      try {
        const copyOfRecipesRatedIdArray = this.recipesRatedIdArray.slice();
        copyOfRecipesRatedIdArray.push({
          recipeId: this.recipeData._id,
          rating: this.starButtonIndexClicked + 1,
        });
        await this.recipeDataApiCalls.updateRecipeRatingData(
          this.recipeData._id,
          this.recipeData.ratings
        );

        const response = await this.recipeDataApiCalls.updateUserRatingArray(
          this.username,
          copyOfRecipesRatedIdArray,
          this.userToken
        );

        this.activatePopupService.successPopupHandler(response.message || '');
      } catch (err) {
        let message;
        if (err instanceof Error) message = err.message;
        else message = String(err);
        this.activatePopupService.errorPopupHandler(message);
      }
    }
  }

  makeButtonHoverHandler() {
    if (!this.makeButtonClickEventOccured) {
      this.makeButtonHoverActive = !this.makeButtonHoverActive;
    }
  }

  makeButtonClickHandler() {
    if (this.makeButtonActive) {
      this.makeButtonClickEventOccured = false;
      this.makeButtonActive = false;
      this.makeButtonHoverActive = false;
      this.recipeData.numberOfMakes = this.recipeData.numberOfMakes - 1;
    } else {
      this.makeButtonClickEventOccured = true;
      this.makeButtonHoverActive = true;
      this.makeButtonActive = true;
      this.recipeData.numberOfMakes = this.recipeData.numberOfMakes + 1;
    }

    this.recipeDataApiCalls
      .updateRecipeNumberOfMakes(
        this.recipeData._id,
        this.recipeData.numberOfMakes
      )
      .then((response) => {
        this.activatePopupService.successPopupHandler(response.message || '');
      });

    const newUserRecipesMadeArrays = this.recipeMadesIdsArray.slice();

    if (this.makeButtonActive) {
      newUserRecipesMadeArrays.push({
        recipeId: this.recipeData._id,
        made: true,
      });
      this.recipeDataApiCalls.updateUserRecipesMadeArray(
        this.username,
        newUserRecipesMadeArrays,
        this.userToken
      );
    } else {
      const tempCopyNewUserRecipesMadeArrays = newUserRecipesMadeArrays.slice();
      for (
        let indexOfUserRecipeMadeArray = 0;
        indexOfUserRecipeMadeArray < newUserRecipesMadeArrays.length;
        indexOfUserRecipeMadeArray++
      ) {
        if (
          newUserRecipesMadeArrays[indexOfUserRecipeMadeArray].recipeId ===
          this.recipeData._id
        ) {
          tempCopyNewUserRecipesMadeArrays.splice(
            indexOfUserRecipeMadeArray,
            1
          );
          break;
        }
      }

      // this.recipeMadesIdsArray = tempCopyNewUserRecipesMadeArrays;
      this.recipeDataApiCalls.updateUserRecipesMadeArray(
        this.username,
        tempCopyNewUserRecipesMadeArrays,
        this.userToken
      );
    }
  }
}
