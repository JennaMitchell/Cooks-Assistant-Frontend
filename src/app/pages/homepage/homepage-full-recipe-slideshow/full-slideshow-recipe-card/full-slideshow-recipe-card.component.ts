import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'homepage-full-slideshow-recipe-card',
  templateUrl: './full-slideshow-recipe-card.component.html',
  styleUrls: ['./full-slideshow-recipe-card.component.css'],
  providers: [],
})
export class FullSlideshowRecipeCard {
  @Input('recipeTitle') recipeTitle = '';
  @Input('recipeTags') recipeTags: string[] = [];
  @Input('recipeDescription') recipeDescription = '';

  @Input('numberOfMakes') numberOfMakes = '';
  @Input('cookingTime') cookingTime = '';
  @Input('numberOfReviews') numberOfReviews = '';
  @Input('postiveRatingArray') postiveRatingArray: boolean[] = [];
  @Input('halfStarActive') halfStarActive: boolean = false;
  @Input('negativeRatingArray') negativeRatingArray: boolean[] = [];
  @Input('iconLocation') iconLocation = '';
  @Input('iconAltText') iconAltText = '';
  @Input('slideshowType') slideshowType = '';
}
