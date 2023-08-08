import { Component, Input, Output, EventEmitter } from '@angular/core';

import {
  preferenceButtonData,
  nationalityButtonData,
  mealsTimesButtonData,
  recipeCourseTagData,
  mainIngredientsData,
} from '../../../constants/constants';

import { RecipeDataApiCalls } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';

@Component({
  selector: 'recipe-browser-nav-menu',
  templateUrl: './recipe-browser-nav-menu.component.html',
  styleUrls: ['./recipe-browser-nav-menu.component.css'],
  providers: [RecipeDataApiCalls],
})
export class RecipeBrowerNavBarComponent {
  constructor(private store: Store) {}

  @Input('menuMoveOut') menuMoveOut = false;
  @Output() userSelectedTagsEvent = new EventEmitter<string[]>();
  @Output() mobileRecipeNavMenuClickHandler = new EventEmitter();

  searchInputContainerActive = false;

  recipeCourseTagData = recipeCourseTagData;
  recipeCourseTitles: string[] = [];
  mainIngredientsData = mainIngredientsData;
  mainIngredientTitles: string[] = [];

  preferenceButtonData = preferenceButtonData;
  preferenceButtonTitles: string[] = [];
  nationalityButtonData = nationalityButtonData;
  nationalityButtonTitles: string[] = [];
  mealsTimesButtonData = mealsTimesButtonData;
  mealsTimesButtonTitles: string[] = [];

  activeDropDownButton = '';

  activeRating = -1;

  selectedSubDropDownsTags: string[] = [];
  searchString = 'search';

  starRatingsObject = {
    one: {
      activeStarArray: ['full', 'empty', 'empty', 'empty', 'empty'],
      id: 'recipe-browser-nav-manu-star-container-1',
    },
    two: {
      activeStarArray: ['full', 'full', 'empty', 'empty', 'empty'],
      id: 'recipe-browser-nav-manu-star-container-2',
    },
    three: {
      activeStarArray: ['full', 'full', 'full', 'empty', 'empty'],
      id: 'recipe-browser-nav-manu-star-container-3',
    },
    four: {
      activeStarArray: ['full', 'full', 'full', 'full', 'empty'],
      id: 'recipe-browser-nav-manu-star-container-4',
    },
    five: {
      activeStarArray: ['full', 'full', 'full', 'full', 'full'],
      id: 'recipe-browser-nav-manu-star-container-5',
    },
  };
  starRatingObjectKeysArray: string[] = ['one', 'two', 'three', 'four', 'five'];
  windowWidth310Pixels = false;

  titlesArrayCreator(data: any) {
    let tempArray: string[] = [];
    data.map((entry: any) => {
      tempArray.push(entry.title);
    });
    return tempArray;
  }
  homepageWindowResizeHandler() {
    this.windowWidth310Pixels = window.matchMedia('(max-width: 310px)').matches;
  }

  ngOnInit() {
    this.homepageWindowResizeHandler();
    window.addEventListener('resize', () => {
      this.homepageWindowResizeHandler();
    });
    this.preferenceButtonTitles = this.titlesArrayCreator(preferenceButtonData);

    this.nationalityButtonTitles = this.titlesArrayCreator(
      nationalityButtonData
    );

    this.mealsTimesButtonTitles = this.titlesArrayCreator(mealsTimesButtonData);

    this.recipeCourseTitles = this.titlesArrayCreator(recipeCourseTagData);
    this.mainIngredientTitles = this.titlesArrayCreator(mainIngredientsData);
  }

  dropDownClickHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLButtonElement;
    let targetId = targetElement.id;
    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLButtonElement;
      targetId = targetElement.id;
    }

    const splitId = targetId.split('-');
    const selectedId = splitId[splitId.length - 1];

    if (selectedId === this.activeDropDownButton) {
      this.activeDropDownButton = '';
    } else {
      this.activeDropDownButton = selectedId;
    }
  }

  subCategoryButtonClickHandler(
    selectedTitle: string,
    topCategoryTitle: string
  ) {
    let tagRemoved = false;
    switch (topCategoryTitle) {
      case 'preferences':
        if (this.preferenceButtonTitles.includes(selectedTitle)) {
          for (
            let indexOfPrefrenceTitles = 0;
            indexOfPrefrenceTitles < this.preferenceButtonTitles.length;
            indexOfPrefrenceTitles++
          ) {
            if (
              this.selectedSubDropDownsTags.includes(
                this.preferenceButtonTitles[indexOfPrefrenceTitles]
              )
            ) {
              const indexOfFoundEntry = this.selectedSubDropDownsTags.indexOf(
                this.preferenceButtonTitles[indexOfPrefrenceTitles]
              );

              this.selectedSubDropDownsTags.splice(indexOfFoundEntry, 1);
              tagRemoved = true;
            }
          }
          if (!tagRemoved) {
            this.selectedSubDropDownsTags.push(selectedTitle);
          }
        }

        break;
      case 'nationality':
        if (this.nationalityButtonTitles.includes(selectedTitle)) {
          for (
            let indexOfNationalityTitles = 0;
            indexOfNationalityTitles < this.nationalityButtonTitles.length;
            indexOfNationalityTitles++
          ) {
            if (
              this.selectedSubDropDownsTags.includes(
                this.nationalityButtonTitles[indexOfNationalityTitles]
              )
            ) {
              const indexOfFoundEntry = this.selectedSubDropDownsTags.indexOf(
                this.nationalityButtonTitles[indexOfNationalityTitles]
              );

              this.selectedSubDropDownsTags.splice(indexOfFoundEntry, 1);
              tagRemoved = true;
            }
          }

          if (!tagRemoved) {
            this.selectedSubDropDownsTags.push(selectedTitle);
          }
        }

        break;
      case 'mealTimes':
        if (this.mealsTimesButtonTitles.includes(selectedTitle)) {
          for (
            let indexOfMealsTimesButtonTitles = 0;
            indexOfMealsTimesButtonTitles < this.mealsTimesButtonTitles.length;
            indexOfMealsTimesButtonTitles++
          ) {
            if (
              this.selectedSubDropDownsTags.includes(
                this.mealsTimesButtonTitles[indexOfMealsTimesButtonTitles]
              )
            ) {
              const indexOfFoundEntry = this.selectedSubDropDownsTags.indexOf(
                this.mealsTimesButtonTitles[indexOfMealsTimesButtonTitles]
              );

              this.selectedSubDropDownsTags.splice(indexOfFoundEntry, 1);
              tagRemoved = true;
            }
          }

          if (!tagRemoved) {
            this.selectedSubDropDownsTags.push(selectedTitle);
          }
        }
        break;
      case 'courses':
        if (this.recipeCourseTitles.includes(selectedTitle)) {
          for (
            let indexOfRecipeCourseTitles = 0;
            indexOfRecipeCourseTitles < this.recipeCourseTitles.length;
            indexOfRecipeCourseTitles++
          ) {
            if (
              this.selectedSubDropDownsTags.includes(
                this.recipeCourseTitles[indexOfRecipeCourseTitles]
              )
            ) {
              const indexOfFoundEntry = this.selectedSubDropDownsTags.indexOf(
                this.recipeCourseTitles[indexOfRecipeCourseTitles]
              );

              this.selectedSubDropDownsTags.splice(indexOfFoundEntry, 1);
              tagRemoved = true;
            }
          }

          if (!tagRemoved) {
            this.selectedSubDropDownsTags.push(selectedTitle);
          }
        }
        break;
      case 'mainIngredient':
        if (this.mainIngredientTitles.includes(selectedTitle)) {
          for (
            let indexOfMainIngredientTitles = 0;
            indexOfMainIngredientTitles < this.mainIngredientTitles.length;
            indexOfMainIngredientTitles++
          ) {
            if (
              this.selectedSubDropDownsTags.includes(
                this.mainIngredientTitles[indexOfMainIngredientTitles]
              )
            ) {
              const indexOfFoundEntry = this.selectedSubDropDownsTags.indexOf(
                this.mainIngredientTitles[indexOfMainIngredientTitles]
              );

              this.selectedSubDropDownsTags.splice(indexOfFoundEntry, 1);
              tagRemoved = true;
            }
          }
          if (!tagRemoved) {
            this.selectedSubDropDownsTags.push(selectedTitle);
          }
        }
        break;

      default:
        break;
    }

    this.userSelectedTagsEvent.emit(this.selectedSubDropDownsTags);
  }

  mobileButtonClickHandler() {
    this.mobileRecipeNavMenuClickHandler.emit();
  }

  searchInputContainerClickHandler() {
    const inputElement = document.getElementsByClassName(
      'recipe-browser-search-input'
    )[0] as HTMLInputElement;
    inputElement.focus();
    this.searchInputContainerActive = true;
  }

  searchInputEnterKeyPressHandler(event: KeyboardEvent) {
    const keyPressed = event.key;
    if (keyPressed === 'Enter') {
      const inputElement = document.getElementsByClassName(
        'recipe-browser-search-input'
      )[0] as HTMLInputElement;
      const inputText = inputElement.value;
      this.store.dispatch(
        PopupActions.updateSearchpopupinputtext({
          searchPopupInputText: inputText,
        })
      );
    }
  }

  ratingButtonClickHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLButtonElement;

    let targetElementId = targetElement.id;

    if (targetElementId.length === 0) {
      targetElement = targetElement.parentElement as HTMLButtonElement;
      targetElementId = targetElement.id;
    }

    const splitId = targetElementId.split('-');
    const ratingToLookUp = +splitId[splitId.length - 1];

    if (ratingToLookUp > 0 && ratingToLookUp <= 5) {
      if (this.activeRating === ratingToLookUp) {
        this.activeRating = -1;
      } else {
        this.activeRating = ratingToLookUp;
      }
      if (this.activeRating === -1) {
        this.store.dispatch(
          PopupActions.updateRecipebrowsergetallratings({
            recipeBrowserGetAllRatings: true,
          })
        );
      } else {
        let greaterThanValue = 0;
        let lessThanValue = 0;
        switch (ratingToLookUp) {
          case 1:
            greaterThanValue = 1;
            lessThanValue = 2;
            break;
          case 2:
            greaterThanValue = 2;
            lessThanValue = 3;
            break;
          case 3:
            greaterThanValue = 3;
            lessThanValue = 4;
            break;
          case 4:
            greaterThanValue = 4;
            lessThanValue = 5;
            break;
          case 5:
            greaterThanValue = 5;
            lessThanValue = 5;
            break;
          default:
            break;
        }

        this.store.dispatch(
          PopupActions.updateRecipebrowserselectedgreaterthanrating({
            recipeBrowserSelectedGreaterThanRating: greaterThanValue,
          })
        );
        this.store.dispatch(
          PopupActions.updateRecipebrowserselectedlessthanrating({
            recipeBrowserSelectedLessThanRating: lessThanValue,
          })
        );
      }
    }
  }
}
