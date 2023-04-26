import { Component, Input } from '@angular/core';

import { RecipeCreatorFunctions } from '../../../../utilities/recipe-creator-functions/recipe-creator-function.service';

import { dishImagesData } from '../../../../constants/dish-image-data';
import { ActivatePopupService } from '../../../../utilities/activate-popup-functions/activate-popup-functions.service';
import { RecipeTemplateSavedDataInterface } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';

@Component({
  selector: 'recipe-template-one-viewer',
  templateUrl: './recipe-template-1-viewer.component.html',
  styleUrls: [
    '../../../recipe-creator/templates/template-1/recipe-template-1.component.css',
    '../recipe-template-viewer-shared-css.component.css',
  ],
  providers: [RecipeCreatorFunctions, ActivatePopupService],
})
export class RecipeTemplateOneViewer {
  @Input('recipeData') recipeData: RecipeTemplateSavedDataInterface = {
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
  };

  dishImagesData = dishImagesData;
}
