import { Component } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
import { RecipeDataApiCalls } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { RecipeTemplateSavedDataInterfaceWithId } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';

@Component({
  selector: 'homepage-recipe-slideshow',
  templateUrl: './homepage-recipe-slideshow.component.html',
  styleUrls: ['./homepage-recipe-slideshow.component.css'],
  providers: [
    RecipeTagFilter,
    RecipeDataApiCalls,
    ActivatePopupService,
    MediaQueryService,
  ],
})
export class HomepageRecipeSlideshow {
  constructor(
    private recipeDataApiCallsService: RecipeDataApiCalls,
    private activatePopupService: ActivatePopupService,
    private mediaQueryService: MediaQueryService
  ) {}

  displayData: RecipeTemplateSavedDataInterfaceWithId[] = [];
  retrievedData: RecipeTemplateSavedDataInterfaceWithId[] = [];
  windowWidth660Pixels = false;
  loadingBarActive = false;

  dataTagArray: string[][] = [];
  activeConfigurationNumber = 0;
  activeSlideNumber = 0;
  allFalseSlides = [false, false, false, false, false, false];
  dishCategories = [
    'chicken',
    'beef',
    'pork',
    'seafood',
    'vegan',
    'vegetarian',
  ];
  activeDishCategory =
    this.dishCategories[this.activeSlideNumber][0].toUpperCase() +
    this.dishCategories[this.activeSlideNumber].slice(
      1,
      this.dishCategories[this.activeSlideNumber].length
    );
  activeSlides = [true, false, false, false, false, false];

  windowResizeHandler() {
    if (this.displayData) {
      const window660Check = window.matchMedia('(max-width: 660px)');

      if (window660Check.matches) {
        if (this.displayData.length > 3) {
          this.displayData = this.displayData.slice(0, 3);
        }
      } else {
        if (this.displayData.length >= 5) {
          this.displayData = this.displayData.slice(0, 5);
        } else {
          this.displayData = this.displayData.slice(0, 5);
        }
      }
    }
  }

  async getDataByCategory(categoryToRetrieve: string) {
    try {
      this.loadingBarActive = true;
      const retrievedResponse =
        await this.recipeDataApiCallsService.getRecipeDataWithFilter(
          categoryToRetrieve
        );

      if (retrievedResponse.retrievedData) {
        this.retrievedData = retrievedResponse.retrievedData;
      }

      if (this.retrievedData.length > 5) {
        this.displayData = this.retrievedData.slice(0, 5);
        this.retrievedData = this.retrievedData.slice(0, 5);
        this.windowResizeHandler();
      } else {
        this.displayData = this.retrievedData;
        this.windowResizeHandler();
      }
      this.loadingBarActive = false;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      this.activatePopupService.errorPopupHandler(message);
    }
  }

  onLeftArrowClick() {
    const copyOfActiveSlide = this.allFalseSlides.slice(0);
    if (this.activeConfigurationNumber >= 2) {
      this.activeConfigurationNumber = 0;
    } else {
      this.activeConfigurationNumber = this.activeConfigurationNumber + 1;
    }

    if (this.activeSlideNumber === 0) {
      this.activeSlideNumber = this.dishCategories.length - 1;
    } else {
      this.activeSlideNumber = this.activeSlideNumber - 1;
    }

    copyOfActiveSlide[this.activeConfigurationNumber] = true;
    this.activeSlides = copyOfActiveSlide;
    this.activeDishCategory =
      this.dishCategories[this.activeSlideNumber][0].toUpperCase() +
      this.dishCategories[this.activeSlideNumber].slice(
        1,
        this.dishCategories[this.activeSlideNumber].length
      );

    this.getDataByCategory(this.dishCategories[this.activeSlideNumber]);
  }
  onRightArrowClick() {
    const copyOfActiveSlide = this.allFalseSlides.slice(0);
    if (this.activeConfigurationNumber <= 0) {
      this.activeConfigurationNumber = 2;
    } else {
      this.activeConfigurationNumber = this.activeConfigurationNumber - 1;
    }

    if (this.activeSlideNumber === this.dishCategories.length - 1) {
      this.activeSlideNumber = 0;
    } else {
      this.activeSlideNumber = this.activeSlideNumber + 1;
    }

    copyOfActiveSlide[this.activeConfigurationNumber] = true;

    this.activeSlides = copyOfActiveSlide;
    this.activeDishCategory =
      this.dishCategories[this.activeSlideNumber][0].toUpperCase() +
      this.dishCategories[this.activeSlideNumber].slice(
        1,
        this.dishCategories[this.activeSlideNumber].length
      );

    this.getDataByCategory(this.dishCategories[this.activeSlideNumber]);
  }

  ngOnInit() {
    this.getDataByCategory(this.dishCategories[0]);
    this.mediaQueryService.moduleTopContainer100PercentWidthUpdate(
      'homepage-slideshow-backdrop'
    );
    this.windowResizeHandler();
    window.addEventListener('resize', () => {
      this.windowResizeHandler();
    });
  }
}
