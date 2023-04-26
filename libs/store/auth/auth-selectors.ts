import { createSelector, createFeatureSelector, select } from '@ngrx/store';

import { AuthStateInterface } from './auth-reducers';

export const selectAuthStore =
  createFeatureSelector<AuthStateInterface>('auth');

export const usernameSelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => state.username
);

export const tokenSelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => state.token
);

export const loggedInSelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => state.loggedIn
);
export const emailSelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => state.email
);

export const userIdSelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => state.userId
);
export const recipesRatedIdsArraySelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => {
    return state.recipesRatedIdsArray;
  }
);
export const recipesCreatedIdsArraySelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => {
    return state.recipesCreatedIdsArray;
  }
);
export const recipesMadeIdsArraySelector = createSelector(
  selectAuthStore,
  (state: AuthStateInterface) => {
    return state.recipesMadeIdsArray;
  }
);
