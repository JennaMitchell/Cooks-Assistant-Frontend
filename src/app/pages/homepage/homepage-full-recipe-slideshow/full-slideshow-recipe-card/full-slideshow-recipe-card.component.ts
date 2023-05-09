import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';
@Component({
  selector: 'homepage-full-slideshow-recipe-card',
  templateUrl: './full-slideshow-recipe-card.component.html',
  styleUrls: ['./full-slideshow-recipe-card.component.css'],
  providers: [MediaQueryService],
})
export class FullSlideshowRecipeCard {
  constructor(private mediaQueryService: MediaQueryService) {}
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
  renderReadyTags: string[] = [];

  ngOnInit() {
    this.mediaQueryService.moduleMultipleTopContainer100PercentWidthUpdate(
      'homepage-new-recipe-card-main-container'
    );
  }
}
