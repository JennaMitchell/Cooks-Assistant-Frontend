import { createReducer, on } from '@ngrx/store';
// import { HomepageApiActions } from './homepage.actions';
import { PopupActions } from './popup-actions.actions';
export interface TemplateTextPopupDataInterface {
  fieldType: string;
  fieldIndex: number;
  currentValue: string;
  newValue: string;
  popupTitle: string;
}

export interface PopupStateInterface {
  lockwebpageViewPort: boolean;
  loginPopupActive: boolean;
  signupPopupActive: boolean;
  recipeCreatorBackgroundPopupActive: boolean;
  changeRecipeTemplatePopupActive: boolean;
  errorPopupActive: boolean;
  errorMessage: string;
  recipeTagsPopupActive: boolean;
  recipeChangeImagePopupActive: boolean;
  successPopupActive: boolean;
  successPopupText: string;
  searchPopupActive: boolean;
  searchPopupInputText: string;
  homepageCategoryPopupActive: boolean;
  homepageCategoryPopupSelectedCategory: string;
  recipeBrowserSelectedLessThanRating: number;
  recipeBrowserSelectedGreaterThanRating: number;
  recipeBrowserGetAllRatings: boolean;
  refreshWarningPopupActive: boolean;
  termsOfServicePopupActive: boolean;
}

export const initialPopupState: PopupStateInterface = {
  lockwebpageViewPort: false,
  loginPopupActive: false,
  signupPopupActive: false,
  recipeCreatorBackgroundPopupActive: false,
  changeRecipeTemplatePopupActive: false,
  errorPopupActive: false,
  errorMessage: '',
  recipeTagsPopupActive: false,
  recipeChangeImagePopupActive: false,
  successPopupActive: false,
  successPopupText: '',
  searchPopupActive: false,
  searchPopupInputText: '',
  homepageCategoryPopupActive: false,
  homepageCategoryPopupSelectedCategory: '',
  recipeBrowserSelectedLessThanRating: -1,
  recipeBrowserSelectedGreaterThanRating: -1,
  recipeBrowserGetAllRatings: false,
  refreshWarningPopupActive: false,
  termsOfServicePopupActive: false,
};

export const popupReducers = createReducer(
  initialPopupState,
  on(PopupActions.updateLockwebpageviewport, (_state, { lock }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['lockwebpageViewPort'] = lock;
    return tempObject;
  }),
  on(PopupActions.updateLoginpopupactive, (_state, { loginPopupActive }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['loginPopupActive'] = loginPopupActive;
    return tempObject;
  }),
  on(PopupActions.updateSignuppopupactive, (_state, { signupPopupActive }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['signupPopupActive'] = signupPopupActive;
    return tempObject;
  }),
  on(
    PopupActions.updateRecipecreatorbackgroundpopupactive,
    (_state, { recipeCreatorBackgroundPopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeCreatorBackgroundPopupActive'] =
        recipeCreatorBackgroundPopupActive;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateChangerecipetemplatepopupactive,
    (_state, { changeRecipeTemplatePopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['changeRecipeTemplatePopupActive'] =
        changeRecipeTemplatePopupActive;
      return tempObject;
    }
  ),
  on(PopupActions.updateErrorpopupactive, (_state, { errorPopupActive }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['errorPopupActive'] = errorPopupActive;
    return tempObject;
  }),
  on(PopupActions.updateErrormessage, (_state, { errorMessage }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['errorMessage'] = errorMessage;
    return tempObject;
  }),
  on(
    PopupActions.updateRecipetagspopupactive,
    (_state, { recipeTagsPopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeTagsPopupActive'] = recipeTagsPopupActive;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateRecipechangeimagepopupactive,
    (_state, { recipeChangeImagePopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeChangeImagePopupActive'] = recipeChangeImagePopupActive;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateSuccesspopupactive,
    (_state, { successPopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['successPopupActive'] = successPopupActive;
      return tempObject;
    }
  ),
  on(PopupActions.updateSuccesspopuptext, (_state, { successPopupText }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['successPopupText'] = successPopupText;
    return tempObject;
  }),
  on(PopupActions.updateSearchpopupactive, (_state, { searchPopupActive }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['searchPopupActive'] = searchPopupActive;
    return tempObject;
  }),
  on(
    PopupActions.updateSearchpopupinputtext,
    (_state, { searchPopupInputText }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['searchPopupInputText'] = searchPopupInputText;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateHomepagecategorypopupactive,
    (_state, { homepageCategoryPopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['homepageCategoryPopupActive'] = homepageCategoryPopupActive;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateHomepagecategorypopupselectedcategory,
    (_state, { homepageCategoryPopupSelectedCategory }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['homepageCategoryPopupSelectedCategory'] =
        homepageCategoryPopupSelectedCategory;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateRecipebrowserselectedlessthanrating,
    (_state, { recipeBrowserSelectedLessThanRating }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeBrowserSelectedLessThanRating'] =
        recipeBrowserSelectedLessThanRating;
      return tempObject;
    }
  ),

  on(
    PopupActions.updateRecipebrowserselectedgreaterthanrating,
    (_state, { recipeBrowserSelectedGreaterThanRating }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeBrowserSelectedGreaterThanRating'] =
        recipeBrowserSelectedGreaterThanRating;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateRecipebrowsergetallratings,
    (_state, { recipeBrowserGetAllRatings }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeBrowserGetAllRatings'] = recipeBrowserGetAllRatings;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateRefreshwarningpopupactive,
    (_state, { refreshWarningPopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['refreshWarningPopupActive'] = refreshWarningPopupActive;
      return tempObject;
    }
  ),
  on(
    PopupActions.updateTermsofservicepopupactive,
    (_state, { termsOfServicePopupActive }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['termsOfServicePopupActive'] = termsOfServicePopupActive;
      return tempObject;
    }
  )
);
