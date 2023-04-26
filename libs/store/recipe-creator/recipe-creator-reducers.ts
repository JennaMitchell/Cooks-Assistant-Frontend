import { createReducer, on } from '@ngrx/store';
// import { HomepageApiActions } from './homepage.actions';
import { RecipeCreatorActions } from './recipe-creator-actions.actions';

export interface RecipeTemplateUserDataInterface {
  title: string;
  quote: string;
  servings: string;
  prepTime: string;
  cookingTime: string;
  ingredientsList: string[];
  directionsList: string[];
  notes: string[];
  description: string;
  selectedRecipeDishImageIndex: number;
}

export interface RecipeCreatorStateInterface {
  selectedBackground: number;
  recipeTemplateUserData: RecipeTemplateUserDataInterface;
  userHasEnteredData: boolean;
  selectedTemplateIndex: number;
  selectedTags: string[];
  userSelectedRecipeDishImageIndex: number;
}

export const initialRecipeCreatorState: RecipeCreatorStateInterface = {
  selectedBackground: 0,
  recipeTemplateUserData: {
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
  },
  userHasEnteredData: false,
  selectedTemplateIndex: 1,
  selectedTags: [],
  userSelectedRecipeDishImageIndex: 0,
};

export const recipeCreatorReducers = createReducer(
  initialRecipeCreatorState,
  on(
    RecipeCreatorActions.updateBackgroundselected,
    (_state, { selectedBackground }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['selectedBackground'] = selectedBackground;
      return tempObject;
    }
  ),
  on(
    RecipeCreatorActions.updateRecipetemplateuserdata,
    (_state, { recipeTemplateUserData }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['recipeTemplateUserData'] = recipeTemplateUserData;
      return tempObject;
    }
  ),
  on(
    RecipeCreatorActions.updateUserhasentereddata,
    (_state, { userHasEnteredData }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['userHasEnteredData'] = userHasEnteredData;
      return tempObject;
    }
  ),
  on(
    RecipeCreatorActions.updateSelectedtemplateindex,
    (_state, { selectedTemplateIndex }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      console.log(selectedTemplateIndex);
      tempObject['selectedTemplateIndex'] = selectedTemplateIndex;
      return tempObject;
    }
  ),
  on(RecipeCreatorActions.updateSelectedtags, (_state, { selectedTags }) => {
    const tempObject = JSON.parse(JSON.stringify(_state));
    tempObject['selectedTags'] = selectedTags;
    return tempObject;
  }),
  on(
    RecipeCreatorActions.updateUserselectedrecipedishimageindex,
    (_state, { userSelectedRecipeDishImageIndex }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['userSelectedRecipeDishImageIndex'] =
        userSelectedRecipeDishImageIndex;
      return tempObject;
    }
  )
);
