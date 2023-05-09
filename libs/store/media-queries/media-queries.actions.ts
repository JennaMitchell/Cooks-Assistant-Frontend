import { props, createActionGroup } from '@ngrx/store';

export const MediaQueryActions = createActionGroup({
  source: 'MediaQuery',
  events: {
    'Update WindowAt500Pixels': props<{ windowAt500Pixels: boolean }>(),
  },
});
