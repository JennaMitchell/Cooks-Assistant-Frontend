import { Component, Input } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
import { CookingTimeStringConverterService } from 'src/app/utilities/cooking-time-string-converter/cooking-time-string-converter.service';
import { NumberOfViewsReturnStringService } from 'src/app/utilities/number-of-views-converter/number-of-views-converter.service';

import { Store } from '@ngrx/store';
import {
  selectedHomepageMealPreferenceSelector,
  selectedHomepageMealTimeSelector,
} from 'libs/store/homepage/homepage-selectors';
import { RecipeDataApiCalls } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { RecipeTemplateSavedDataInterfaceWithId } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import {
  nationalityButtonData,
  preferenceButtonData,
  mealsTimesButtonData,
} from 'src/app/constants/constants';
import { Router } from '@angular/router';
import { dishImagesData } from 'src/app/constants/dish-image-data';
import { IconImageRetrieverService } from 'src/app/utilities/icon-image-retriever-service/icon-image-retreiver-service.service';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';
@Component({
  selector: 'homepage-full-recipe-slideshow',
  templateUrl: './homepage-full-recipe-slideshow.component.html',
  styleUrls: ['./homepage-full-recipe-slideshow.component.css'],
  providers: [
    RecipeTagFilter,
    CookingTimeStringConverterService,
    NumberOfViewsReturnStringService,
    IconImageRetrieverService,
    MediaQueryService,
  ],
})
export class HomepageFullRecipeSlideshow {
  @Input('slideshowType') slideShowType = '';
  constructor(
    private numberOfViewsReturnStringService: NumberOfViewsReturnStringService,
    private store: Store,
    private router: Router,
    private recipeDataApiCalls: RecipeDataApiCalls,
    private activatePopupService: ActivatePopupService,
    private cookingTimeStringConverterService: CookingTimeStringConverterService,
    private iconImageRetrieverService: IconImageRetrieverService,
    private mediaQueryService: MediaQueryService
  ) {}
  currentlySelectedRecipeNumber = 0;
  numberOfMakesArray: string[] = [];
  postiveRatingArray: boolean[] = [];
  negativeRatingArray: boolean[] = [];
  postiveRatingActive = false;
  negativeRatingActive = false;
  halfStarActive = false;
  displayReadyNumberOfReviews = '';
  displayReadyCookingTime = '';
  displayReadyNumberOfMakes = '';
  iconLocation = '';
  iconAltText = '';
  selectedHomepageMealPreferenceObserver$ = this.store.select(
    selectedHomepageMealPreferenceSelector
  );
  selectedHomepageMealPreference = '';

  selectedHomepageMealTimeObserver$ = this.store.select(
    selectedHomepageMealTimeSelector
  );
  selectedHomepageMealTime = '';
  nationalityButtonData = nationalityButtonData;
  preferenceButtonData = preferenceButtonData;
  mealsTimesButtonData = mealsTimesButtonData;
  possibleNationalities: string[] = [];
  possibleMealTimes: string[] = [];
  possiblePrefrences: string[] = [];
  dishImagesData = dishImagesData;

  displayData: RecipeTemplateSavedDataInterfaceWithId[] = [];
  mobileMenuButtonActive = false;
  windowWidth1050Pixels = false;

  currentSelectedRecipeHandler(activeRecipeNumber: number) {
    this.currentlySelectedRecipeNumber = activeRecipeNumber;
  }

  homepageFullRecipeSlideWindowResizeHandler() {
    this.windowWidth1050Pixels = window.matchMedia(
      '(max-width: 1050px)'
    ).matches;
  }

  mobileMenuClickHandler() {
    this.mobileMenuButtonActive = !this.mobileMenuButtonActive;
  }

  async getDataByCategory(categoryToRetrieve: string) {
    try {
      const retrievedResponse =
        await this.recipeDataApiCalls.getRecipeDataWithFilter(
          categoryToRetrieve
        );

      let retrievedData: RecipeTemplateSavedDataInterfaceWithId[] = [];

      if (retrievedResponse.retrievedData) {
        retrievedData = retrievedResponse.retrievedData;
      }

      if (retrievedData.length > 5) {
        this.displayData = retrievedData.slice(0, 5);
      } else {
        this.displayData = retrievedData;
      }

      this.infoPreper(this.displayData[0]);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      this.activatePopupService.errorPopupHandler(message);
    }
  }

  ngOnInit() {
    this.mediaQueryService.moduleTopContainer100PercentWidthUpdate(
      'homepage-new-recipe-slideshow-backdrop'
    );

    this.selectedHomepageMealPreferenceObserver$.subscribe((value: string) => {
      this.selectedHomepageMealPreference = value;
      if (this.slideShowType === 'preference') {
        if (value.length === 0) {
          this.getDataByCategory('chicken');
          this.infoPreper(this.displayData[0]);
        } else {
          this.getDataByCategory(value);
        }
      }
    });

    this.selectedHomepageMealTimeObserver$.subscribe((value: string) => {
      this.selectedHomepageMealTime = value;
      if (this.slideShowType === 'cooking-time') {
        if (value.length === 0) {
          this.getDataByCategory('dinner');
          this.infoPreper(this.displayData[0]);
        } else {
          this.getDataByCategory(value);
        }
      }
    });

    this.possibleNationalities = this.nationalityButtonData.map((entry) => {
      return entry.title.toLowerCase();
    });

    this.possibleMealTimes = this.mealsTimesButtonData.map((entry) => {
      return entry.title.toLowerCase();
    });
    this.possiblePrefrences = this.preferenceButtonData.map((entry) => {
      return entry.title.toLowerCase();
    });

    this.infoPreper(this.displayData[0]);
    this.homepageFullRecipeSlideWindowResizeHandler();
    window.addEventListener('resize', () => {
      this.homepageFullRecipeSlideWindowResizeHandler();
    });
  }

  infoPreper(tempDataEntry: RecipeTemplateSavedDataInterfaceWithId) {
    if (!tempDataEntry) {
      return;
    }

    let totalReviewScore = 0;

    for (
      let indexOfRatingsDataEntry = 0;
      indexOfRatingsDataEntry < tempDataEntry.ratings.length;
      indexOfRatingsDataEntry++
    ) {
      totalReviewScore =
        totalReviewScore + tempDataEntry.ratings[indexOfRatingsDataEntry];
    }
    totalReviewScore = totalReviewScore / tempDataEntry.ratings.length;

    this.displayReadyNumberOfReviews =
      this.numberOfViewsReturnStringService.numberOfViewsConverter(
        tempDataEntry.ratings.length
      );

    this.displayReadyNumberOfMakes =
      this.numberOfViewsReturnStringService.numberOfViewsConverter(
        +tempDataEntry.numberOfMakes
      );

    for (
      let tempTagsEntry = 0;
      tempTagsEntry < tempDataEntry.tags.length;
      tempTagsEntry++
    ) {
      if (this.slideShowType === 'cooking-time') {
        if (
          this.possibleMealTimes.includes(tempDataEntry.tags[tempTagsEntry])
        ) {
          if (
            tempDataEntry.tags[tempTagsEntry].toLowerCase() ===
            this.selectedHomepageMealTime.toLowerCase()
          ) {
            this.iconLocation =
              this.iconImageRetrieverService.recipeTimeIconRetriever(
                tempDataEntry.tags[tempTagsEntry]
              );

            break;
          }
        }
      }

      if (this.slideShowType === 'preference') {
        if (
          this.possiblePrefrences.includes(tempDataEntry.tags[tempTagsEntry])
        ) {
          if (
            tempDataEntry.tags[tempTagsEntry].toLowerCase() ===
            this.selectedHomepageMealPreference.toLowerCase()
          ) {
            this.iconLocation =
              this.iconImageRetrieverService.preferenceIconRetriever(
                tempDataEntry.tags[tempTagsEntry]
              );

            break;
          }
        }
      }
    }

    this.displayReadyCookingTime =
      this.cookingTimeStringConverterService.cookingTimeStringConverter(
        tempDataEntry.cookingTime
      );

    let stringifiedRating = `${totalReviewScore.toFixed(1)}`;
    const maxStarRating = 5;
    const tempPostiveStarArray = [];
    const tempNegativeStarArray = [];

    if (+stringifiedRating > 0 && +stringifiedRating < 5) {
      this.postiveRatingActive = true;
      this.negativeRatingActive = true;
    }
    if (+stringifiedRating === 0) {
      this.negativeRatingActive = true;
    }
    if (+stringifiedRating === maxStarRating) {
      this.postiveRatingActive = true;
    }

    if (stringifiedRating.includes('.')) {
      const indexOfDecimal = stringifiedRating.indexOf('.');
      const tenthsPlaceDecimalValue = +stringifiedRating[indexOfDecimal + 1];

      if (tenthsPlaceDecimalValue >= 1) {
        this.halfStarActive = true;
        stringifiedRating = stringifiedRating.slice(0, indexOfDecimal);
      } else {
        this.halfStarActive = false;
      }
    }

    for (
      let postiveStarIndex = 0;
      postiveStarIndex < +stringifiedRating;
      postiveStarIndex++
    ) {
      tempPostiveStarArray[postiveStarIndex] = true;
    }

    if (this.halfStarActive) {
      tempPostiveStarArray.splice(0, 1);
    }
    this.postiveRatingArray = tempPostiveStarArray;

    for (
      let negativeStarRating = 0;
      negativeStarRating < maxStarRating - +stringifiedRating;
      negativeStarRating++
    ) {
      tempNegativeStarArray[negativeStarRating] = true;
    }
    this.negativeRatingArray = tempNegativeStarArray;
  }

  makeButtonClick() {
    this.router.navigateByUrl(
      `/recipe-viewer/${
        this.displayData[this.currentlySelectedRecipeNumber]._id
      }`
    );
  }
}
