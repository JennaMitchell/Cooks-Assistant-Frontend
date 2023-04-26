import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RecipeCreatorStateInterface } from './recipe-creator-reducers';

export const selectRecipeCreatorStore =
  createFeatureSelector<RecipeCreatorStateInterface>('recipeCreator');

export const selectedRecipeCreatorBackground = createSelector(
  selectRecipeCreatorStore,
  (state: RecipeCreatorStateInterface) => state.selectedBackground
);
export const selectedRecipeTemplateUserData = createSelector(
  selectRecipeCreatorStore,
  (state: RecipeCreatorStateInterface) => state.recipeTemplateUserData
);

export const userHasEnteredDataSelector = createSelector(
  selectRecipeCreatorStore,
  (state: RecipeCreatorStateInterface) => state.userHasEnteredData
);
export const selectedTemplateIndexSelector = createSelector(
  selectRecipeCreatorStore,
  (state: RecipeCreatorStateInterface) => state.selectedTemplateIndex
);
export const selectedTagsSelector = createSelector(
  selectRecipeCreatorStore,
  (state: RecipeCreatorStateInterface) => state.selectedTags
);
export const userSelectedRecipeDishImageIndexSelector = createSelector(
  selectRecipeCreatorStore,
  (state: RecipeCreatorStateInterface) => state.userSelectedRecipeDishImageIndex
);
