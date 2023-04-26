import { props, createActionGroup } from '@ngrx/store';

export const PopupActions = createActionGroup({
  source: 'popup',
  events: {
    'Update LockWebpageViewPort': props<{ lock: boolean }>(),
    'Update LoginPopupActive': props<{ loginPopupActive: boolean }>(),
    'Update SignupPopupActive': props<{ signupPopupActive: boolean }>(),
    'Update RecipeCreatorBackgroundPopupActive': props<{
      recipeCreatorBackgroundPopupActive: boolean;
    }>(),
    'Update ChangeRecipeTemplatePopupActive': props<{
      changeRecipeTemplatePopupActive: boolean;
    }>(),
    'Update ErrorPopupActive': props<{ errorPopupActive: boolean }>(),
    'Update ErrorMessage': props<{ errorMessage: string }>(),
    'Update RecipeTagsPopupActive': props<{ recipeTagsPopupActive: boolean }>(),
    'Update RecipeChangeImagePopupActive': props<{
      recipeChangeImagePopupActive: boolean;
    }>(),
    'Update SuccessPopupActive': props<{ successPopupActive: boolean }>(),
    'Update SuccessPopupText': props<{ successPopupText: string }>(),
    'Update SearchPopupActive': props<{ searchPopupActive: boolean }>(),
    'Update SearchPopupInputText': props<{ searchPopupInputText: string }>(),
    'Update HomepageCategoryPopupActive': props<{
      homepageCategoryPopupActive: boolean;
    }>(),
    'Update HomepageCategoryPopupSelectedCategory': props<{
      homepageCategoryPopupSelectedCategory: string;
    }>(),
    'Update RecipeBrowserSelectedLessThanRating': props<{
      recipeBrowserSelectedLessThanRating: number;
    }>(),
    'Update RecipeBrowserSelectedGreaterThanRating': props<{
      recipeBrowserSelectedGreaterThanRating: number;
    }>(),
    'Update RecipeBrowserGetAllRatings': props<{
      recipeBrowserGetAllRatings: boolean;
    }>(),
    'Update RefreshWarningPopupActive': props<{
      refreshWarningPopupActive: boolean;
    }>(),
  },
});
