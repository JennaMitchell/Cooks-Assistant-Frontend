import { Component } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
import { RecipeDataApiCalls } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { RecipeTemplateSavedDataInterfaceWithId } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { dishImagesData } from 'src/app/constants/dish-image-data';
import { Store } from '@ngrx/store';
import { selectedHomepageMealNationalitySelector } from 'libs/store/homepage/homepage-selectors';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';
@Component({
  selector: 'homepage-cuisines-section',
  templateUrl: './homepage-cuisines-section.component.html',
  styleUrls: ['./homepage-cuisines-section.component.css'],
  providers: [
    RecipeTagFilter,
    RecipeDataApiCalls,
    ActivatePopupService,
    MediaQueryService,
  ],
})
export class HomepageCuisinesSection {
  constructor(
    private recipeDataApiCallsService: RecipeDataApiCalls,
    private activatePopupService: ActivatePopupService,
    private store: Store,
    private tagFilterService: RecipeTagFilter,
    private mediaQueryService: MediaQueryService
  ) {}

  dishImagesData = dishImagesData;
  displayData: RecipeTemplateSavedDataInterfaceWithId[] = [];
  dataTagArray: string[][] = [];
  activeConfigurationNumber = 0;
  activeSlideNumber = 0;
  allFalseSlides = [false, false, false, false, false, false];
  activeSlides = [true, false, false, false, false, false];
  selectedHomepageMealNationalitySelectorObserver$ = this.store.select(
    selectedHomepageMealNationalitySelector
  );
  selectedHomepageMealNationality = '';

  renderReadyIcons: {
    title: string;
    iconLocation: string;
    id: string;
    altText: string;
  }[] = [];
  windowWidth1050Pixels = false;
  windowWidth580Pixels = false;
  mobileMenuButtonActive = false;

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
      const tempActiveSlidesArray: boolean[] = this.allFalseSlides.slice();
      for (
        let indexOfDisplayData = 0;
        indexOfDisplayData < this.displayData.length;
        indexOfDisplayData++
      ) {
        tempActiveSlidesArray[indexOfDisplayData] = true;
      }
      this.activeSlides = tempActiveSlidesArray;
      this.tagsArrayCreator(this.displayData[0].tags);
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);

      this.activatePopupService.errorPopupHandler(message);
    }
  }

  tagsArrayCreator(tagsArray: string[]) {
    const retirevedTagsImageArray: {
      title: string;
      iconLocation: string;
      id: string;
      altText: string;
    }[] = [];
    for (
      let tagsArrayIndex = 0;
      tagsArrayIndex < tagsArray.length;
      tagsArrayIndex++
    ) {
      retirevedTagsImageArray.push(
        this.tagFilterService.recipeTagFilter(tagsArray[tagsArrayIndex])
      );
    }
    if (retirevedTagsImageArray.length > 3) {
      this.renderReadyIcons = retirevedTagsImageArray.slice(0, 3);
    } else {
      this.renderReadyIcons = retirevedTagsImageArray;
    }
  }
  homepageFullRecipeSlideWindowResizeHandler() {
    this.windowWidth1050Pixels = window.matchMedia(
      '(max-width: 1050px)'
    ).matches;

    this.windowWidth580Pixels = window.matchMedia('(max-width:580px)').matches;
  }

  mobileMenuClickHandler() {
    this.mobileMenuButtonActive = !this.mobileMenuButtonActive;
  }
  ngOnInit() {
    this.selectedHomepageMealNationalitySelectorObserver$.subscribe((value) => {
      this.selectedHomepageMealNationality = value;

      if (value.length === 0) {
        this.getDataByCategory('chinense');
      } else {
        this.getDataByCategory(value);
      }
    });

    this.mediaQueryService.moduleTopContainer100PercentWidthUpdate(
      'homepage-cuisine-section-main-container'
    );
    this.homepageFullRecipeSlideWindowResizeHandler();
    window.addEventListener('resize', () => {
      this.homepageFullRecipeSlideWindowResizeHandler();
    });
  }
}
