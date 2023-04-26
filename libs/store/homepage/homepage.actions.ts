import { props, createActionGroup } from '@ngrx/store';

export const HomepageActions = createActionGroup({
  source: 'Homepage',
  events: {
    'Update SelectedHomepageMealTime': props<{ selectedMealTime: string }>(),
    'Update SelectedHomepageMealPreference': props<{
      selectedHomepageMealPreference: string;
    }>(),
    'Update SelectedHomepageMealNationality': props<{
      selectedMealNationality: string;
    }>(),
    'Update HomepagePopularButtonClicked': props<{
      homepagePopularButtonClicked: boolean;
    }>(),
  },
});
