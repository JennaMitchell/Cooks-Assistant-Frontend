import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RecipeTemplateSavedDataInterfaceWithId } from '../../../../app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { Input } from '@angular/core';
import { dishImagesData } from '../../../constants/dish-image-data';

@Component({
  selector: 'recipe-browser-recipe-card',
  templateUrl: './recipe-browser-recipe-card.component.html',
  styleUrls: ['./recipe-browser-recipe-card.component.css'],
  providers: [],
})
export class RecipeBrowerRecipeCardComponent {
  @Input('recipeEntry') recipeEntry: RecipeTemplateSavedDataInterfaceWithId = {
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
  };

  dishImagesData = dishImagesData;

  dishImageLocation = `../../../../../${
    dishImagesData[this.recipeEntry.selectedRecipeDishImageIndex].imageLocation
  }`;

  newTagActive = false;

  averagedRating = 0;

  ngAfterContentChecked() {
    this.dishImageLocation = `../../../../../${
      dishImagesData[this.recipeEntry.selectedRecipeDishImageIndex]
        .imageLocation
    }`;
  }

  ngOnInit() {
    const topCardElements = document.getElementsByClassName(
      'recipe-browser-recipe-card'
    );
    for (
      let indexOfTopCardElements = 0;
      indexOfTopCardElements < topCardElements.length;
      indexOfTopCardElements++
    ) {
      const parentELement = topCardElements[indexOfTopCardElements]
        .parentElement as HTMLElement;
      parentELement.style.width = 'max(100%,100%)';
      parentELement.style.height = 'max(100%,100%)';
    }

    if (
      this.recipeEntry.ratings.length === 0 ||
      this.recipeEntry.numberOfMakes === 0
    ) {
      this.newTagActive = true;
    }

    if (this.recipeEntry.ratings.length !== 0) {
      let ratingTotal = 0;

      this.recipeEntry.ratings.map((value) => {
        ratingTotal = ratingTotal + value;
      });

      this.averagedRating = ratingTotal / this.recipeEntry.ratings.length;
    }
  }
}
