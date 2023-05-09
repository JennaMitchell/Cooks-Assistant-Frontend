import { createSelector, createFeatureSelector } from '@ngrx/store';

import { PopupStateInterface } from './popup-reducers';

export const selectPopupStateSlice =
  createFeatureSelector<PopupStateInterface>('popup');
export const lockWebpageViewPortSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.lockwebpageViewPort;
  }
);

export const loginPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.loginPopupActive;
  }
);

export const signupPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.signupPopupActive;
  }
);
export const recipeCreatorBackgroundPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.recipeCreatorBackgroundPopupActive;
  }
);
export const changeRecipeTemplatePopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.changeRecipeTemplatePopupActive;
  }
);

export const errorPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.errorPopupActive;
  }
);

export const errorMessageSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.errorMessage;
  }
);
export const recipeTagsPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.recipeTagsPopupActive;
  }
);
export const recipeChangeImagePopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.recipeChangeImagePopupActive;
  }
);
export const successPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.successPopupActive;
  }
);

export const successPopupTextSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.successPopupText;
  }
);

export const searchPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.searchPopupActive;
  }
);

export const searchPopupInputTextSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.searchPopupInputText;
  }
);

export const homepageCategoryPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.homepageCategoryPopupActive;
  }
);
export const homepageCategoryPopupSelectedCategorySelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.homepageCategoryPopupSelectedCategory;
  }
);

export const recipeBrowserSelectedRatingSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return {
      lessThan: state.recipeBrowserSelectedLessThanRating,
      greaterThan: state.recipeBrowserSelectedGreaterThanRating,
    };
  }
);
export const recipeBrowserGetAllRatingsSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.recipeBrowserGetAllRatings;
  }
);
export const refreshWarningPopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.refreshWarningPopupActive;
  }
);

export const termsOfServicePopupActiveSelector = createSelector(
  selectPopupStateSlice,
  (state) => {
    return state.termsOfServicePopupActive;
  }
);
