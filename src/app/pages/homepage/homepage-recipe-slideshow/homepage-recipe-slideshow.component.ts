import { Component } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
import { RecipeDataApiCalls } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { RecipeTemplateSavedDataInterfaceWithId } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
@Component({
  selector: 'homepage-recipe-slideshow',
  templateUrl: './homepage-recipe-slideshow.component.html',
  styleUrls: ['./homepage-recipe-slideshow.component.css'],
  providers: [RecipeTagFilter, RecipeDataApiCalls, ActivatePopupService],
})
export class HomepageRecipeSlideshow {
  displayData: RecipeTemplateSavedDataInterfaceWithId[] = [];

  constructor(
    private recipeDataApiCallsService: RecipeDataApiCalls,
    private activatePopupService: ActivatePopupService
  ) {}

  async getDataByCategory(categoryToRetrieve: string) {
    try {
      const retrievedResponse =
        await this.recipeDataApiCallsService.getRecipeDataWithFilter(
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
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      this.activatePopupService.errorPopupHandler(message);
    }
  }

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
  }
}
