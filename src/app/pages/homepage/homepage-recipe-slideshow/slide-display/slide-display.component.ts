import { Component, Input } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
import { RecipeTemplateSavedDataInterfaceWithId } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { dishImagesData } from 'src/app/constants/dish-image-data';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';
@Component({
  selector: 'slide-display',
  templateUrl: './slide-display.component.html',
  styleUrls: ['./slide-display.component.css'],
  providers: [RecipeTagFilter, MediaQueryService],
})
export class SlideDisplay {
  constructor(private tagFilterService: RecipeTagFilter) {}
  @Input('configuration') configuration = 0;
  @Input('slideTitle') slideTitle = '';
  @Input('retrievedDataFromParent')
  retrievedDataFromParent: RecipeTemplateSavedDataInterfaceWithId[] = [
    {
      title: '',
      quote: '',
      servings: '',
      prepTime: '',
      cookingTime: '',
      ingredientsList: [''],
      directionsList: [''],
      notes: [''],
      description: '',
      selectedRecipeDishImageIndex: 0,
      username: '',
      selectedTemplateIndex: 0,
      tags: [''],
      ratings: [],
      numberOfMakes: 0,
      _id: '',
    },
  ];

  dishImagesData = dishImagesData;

  renderReadyIcons: {
    title: string;
    iconLocation: string;
    id: string;
    altText: string;
  }[] = [];

  activeSlidesArray: boolean[] = [false, false, false, false, false];
  windowResizedTo605Pixels = false;
  windowResizeTitleCardHandler() {
    this.windowResizedTo605Pixels =
      window.matchMedia('(max-width: 605px)').matches;
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

  updateConfiguration() {
    if (this.configuration === 0) {
      if (this.retrievedDataFromParent.length >= 3) {
        this.tagsArrayCreator(this.retrievedDataFromParent[2].tags);
      }
    } else if (this.configuration === 1) {
      if (this.retrievedDataFromParent.length >= 1) {
        this.tagsArrayCreator(this.retrievedDataFromParent[0].tags);
      }
    } else {
      if (this.retrievedDataFromParent.length >= 5) {
        this.tagsArrayCreator(this.retrievedDataFromParent[4].tags);
      }
    }

    const tempBooleanArray: boolean[] = [];

    for (
      let indexOfRetrievedDataFromParent = 0;
      indexOfRetrievedDataFromParent < this.retrievedDataFromParent.length;
      indexOfRetrievedDataFromParent++
    ) {
      tempBooleanArray.push(true);
    }

    if (tempBooleanArray.length < 5) {
      const numberOfFalseEntries = 5 - tempBooleanArray.length;

      for (
        let indexOfFalseEntries = 0;
        indexOfFalseEntries < numberOfFalseEntries;
        indexOfFalseEntries++
      ) {
        tempBooleanArray.push(false);
      }
    }
    this.activeSlidesArray = tempBooleanArray;
  }
  ngOnChanges() {
    this.updateConfiguration();
  }

  ngOnInit() {
    this.updateConfiguration();
    window.addEventListener('resize', () => {
      this.windowResizeTitleCardHandler();
    });
  }
}
