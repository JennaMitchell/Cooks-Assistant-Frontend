import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomepageStateInterface } from 'libs/store/homepage/homepage-reducers';
import { HomepageActions } from 'libs/store/homepage/homepage.actions';
import {
  selectedHomepageMealPreferenceSelector,
  selectedHomepageMealTimeSelector,
  selectedHomepageMealNationalitySelector,
} from 'libs/store/homepage/homepage-selectors';

import {
  preferenceButtonData,
  nationalityButtonData,
  mealsTimesButtonData,
} from '../../../constants/constants';
interface ButtonData {
  title: string;
  iconLocation: string;
  id: string;
}
@Component({
  selector: 'homepage-recipe-categories',
  templateUrl: './homepage-recipe-categories.component.html',
  styleUrls: ['./homepage-recipe-categories.component.css'],
  providers: [],
})
export class HomepageRecipeCategories {
  constructor(private store: Store<HomepageStateInterface>) {}
  preferenceButtonData = preferenceButtonData;
  nationalityButtonData = nationalityButtonData;
  mealsTimesButtonData = mealsTimesButtonData;

  prefrenceButtonTitles: string[] = [];
  nationalityButtonTitles: string[] = [];
  mealsTimesButtonTitles: string[] = [];
  allButtonsTitles: string[] = [];

  selectedHomepageMealTimeObserver$ = this.store.select(
    selectedHomepageMealTimeSelector
  );
  selectedHomepageMealPreferenceObserver$ = this.store.select(
    selectedHomepageMealPreferenceSelector
  );
  selectedHomepageMealNationalityObserver$ = this.store.select(
    selectedHomepageMealNationalitySelector
  );

  selectedHomepageMealTimeValue = '';
  selectedHomepageMealPreferenceValue = '';
  selectedHomepageMealNationalityValue = '';

  ngOnInit() {
    this.prefrenceButtonTitles = this.preferenceButtonData.map((catData) => {
      return catData['title'].toLowerCase();
    });

    this.nationalityButtonTitles = this.nationalityButtonData.map((catData) => {
      return catData['title'].toLowerCase();
    });

    this.mealsTimesButtonTitles = this.mealsTimesButtonData.map((catData) => {
      return catData['title'].toLowerCase();
    });

    this.allButtonsTitles = this.prefrenceButtonTitles.concat(
      this.nationalityButtonTitles,
      this.mealsTimesButtonTitles
    );

    // extracting values from the store

    this.selectedHomepageMealTimeObserver$.subscribe((value) => {
      this.selectedHomepageMealTimeValue = value;
    });

    this.selectedHomepageMealPreferenceObserver$.subscribe((value) => {
      this.selectedHomepageMealPreferenceValue = value;
    });

    this.selectedHomepageMealNationalityObserver$.subscribe((value) => {
      this.selectedHomepageMealNationalityValue = value;
    });
  }

  buttonCheckHandler(
    arrayOfTitle: string[],
    data: ButtonData[],
    clickedId: string
  ) {
    for (
      let indexOfArrayOfTitle = 0;
      indexOfArrayOfTitle < arrayOfTitle.length;
      indexOfArrayOfTitle++
    ) {
      const idToSelect = data[indexOfArrayOfTitle].id;
      const titleToCheck = data[indexOfArrayOfTitle].title.toLowerCase();

      const buttonToCheck = document.getElementById(
        idToSelect
      ) as HTMLDivElement;

      if (clickedId === titleToCheck) {
        buttonToCheck.classList.toggle(
          'homepage-category-button-container-active'
        );
      } else {
        buttonToCheck.classList.remove(
          'homepage-category-button-container-active'
        );
      }
    }
  }

  updateActiveButtonFunction(clickedButtonId: string) {
    let buttonCat = '';

    if (this.prefrenceButtonTitles.includes(clickedButtonId)) {
      buttonCat = 'Preference';
    } else if (this.nationalityButtonTitles.includes(clickedButtonId)) {
      buttonCat = 'Nationality';
    } else if (this.mealsTimesButtonTitles.includes(clickedButtonId)) {
      buttonCat = 'Times';
    }

    switch (buttonCat) {
      case 'Preference':
        this.buttonCheckHandler(
          this.prefrenceButtonTitles,
          this.preferenceButtonData,
          clickedButtonId
        );
        break;
      case 'Nationality':
        this.buttonCheckHandler(
          this.nationalityButtonTitles,
          this.nationalityButtonData,
          clickedButtonId
        );
        break;
      case 'Times':
        this.buttonCheckHandler(
          this.mealsTimesButtonTitles,
          this.mealsTimesButtonData,
          clickedButtonId
        );
        break;
      default:
        break;
    }
  }

  buttonIdExtractor(id: string) {
    const indexOfFirstIdDash = id.indexOf('-');
    const firstDashRemovedId = id.slice(indexOfFirstIdDash + 1, id.length);
    const indexOfSecondIdDash = firstDashRemovedId.indexOf('-');
    const extractedId = firstDashRemovedId.slice(0, indexOfSecondIdDash);
    return extractedId;
  }

  categoryButtonClickHandler(event: any) {
    const target = event.target || event.srcElement || event.currentTarget;

    let targetId = target.id;

    if (targetId.length === 0) {
      targetId = event.target.parentNode.id;
    }

    const extractedId = this.buttonIdExtractor(targetId);

    // target.classList.toggle('homepage-category-button-container-active');
    this.updateActiveButtonFunction(extractedId);

    // Filtering by cat

    if (this.allButtonsTitles.includes(extractedId)) {
      if (this.prefrenceButtonTitles.includes(extractedId)) {
        this.store.dispatch(
          HomepageActions.updateSelectedhomepagemealpreference({
            selectedHomepageMealPreference: extractedId,
          })
        );
      } else if (this.nationalityButtonTitles.includes(extractedId)) {
        this.store.dispatch(
          HomepageActions.updateSelectedhomepagemealnationality({
            selectedMealNationality: extractedId,
          })
        );
      } else if (this.mealsTimesButtonTitles.includes(extractedId)) {
        this.store.dispatch(
          HomepageActions.updateSelectedhomepagemealtime({
            selectedMealTime: extractedId,
          })
        );
      }
    }
  }
}
