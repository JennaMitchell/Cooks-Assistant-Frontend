import { props, createActionGroup } from '@ngrx/store';
import { UserRatedRecipeEntryInterface } from './auth-reducers';
export const AuthActions = createActionGroup({
  source: 'auth',
  events: {
    'Update Username': props<{ username: string }>(),
    'Update Token': props<{ token: string }>(),
    'Update LoggedIn': props<{ loggedIn: boolean }>(),
    'Update Email': props<{ email: string }>(),
    'Update UserId': props<{ userId: string }>(),

    'Update RecipesRatedIdArray': props<{
      recipesRatedIdArray: UserRatedRecipeEntryInterface[];
    }>(),
    'Update RecipesCreatedIdsArray': props<{
      recipesCreatedIdsArray: string[];
    }>(),
    'Update RecipesMadeIdsArray': props<{
      recipesMadeIdsArray: UserRatedRecipeEntryInterface[];
    }>(),
  },
});
