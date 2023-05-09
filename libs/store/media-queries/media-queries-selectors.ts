import { createSelector, createFeatureSelector } from '@ngrx/store';

import { MediaQueryStateInterface } from './media-queries-reducers';

export const selectMediaQueryStore =
  createFeatureSelector<MediaQueryStateInterface>('mediaQuery');

export const selectedWindowAt500Pixels = createSelector(
  selectMediaQueryStore,
  (state: MediaQueryStateInterface) => state.windowAt500Pixels
);
