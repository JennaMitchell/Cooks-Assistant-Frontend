import { createReducer, on } from '@ngrx/store';
// import { HomepageApiActions } from './homepage.actions';
import { MediaQueryActions } from './media-queries.actions';

export interface MediaQueryStateInterface {
  windowAt500Pixels: boolean;
}

export const initialMediaQueryState: MediaQueryStateInterface = {
  windowAt500Pixels: false,
};

export const mediaQueryReducers = createReducer(
  initialMediaQueryState,
  on(
    MediaQueryActions.updateWindowat500pixels,
    (_state, { windowAt500Pixels }) => {
      const tempObject = JSON.parse(JSON.stringify(_state));
      tempObject['windowAt500Pixels'] = windowAt500Pixels;
      return tempObject;
    }
  )
);
