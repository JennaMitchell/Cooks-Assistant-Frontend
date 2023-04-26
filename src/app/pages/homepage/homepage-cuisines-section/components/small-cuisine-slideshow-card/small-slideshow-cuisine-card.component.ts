import { Component, Input } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
@Component({
  selector: 'small-slideshow-cuisine-card',
  templateUrl: './small-slideshow-cuisine-card.component.html',
  styleUrls: ['./small-slideshow-cuisine-card.component.css'],
  providers: [RecipeTagFilter],
})
export class SmallSlideShowCuisineCard {
  @Input('title') title = '';
  @Input('imageUrl') imageUrl = '';
  @Input('recipeId') recipeId = '';
}
