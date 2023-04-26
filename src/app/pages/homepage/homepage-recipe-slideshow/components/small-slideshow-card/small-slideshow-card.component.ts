import { Component, Input } from '@angular/core';
import { RecipeTagFilter } from 'src/app/utilities/recipe-tag-filter/recipe-tag-filter.service';
import { Router } from '@angular/router';
@Component({
  selector: 'small-slideshow-card',
  templateUrl: './small-slideshow-card.component.html',
  styleUrls: ['./small-slideshow-card.component.css'],
  providers: [RecipeTagFilter],
})
export class SmallSlideShowCard {
  constructor(private router: Router) {}
  @Input('title') title = '';
  @Input('imageUrl') imageUrl = '';
  @Input('recipeId') recipeId = '';

  cardClickHandler() {
    this.router.navigateByUrl(`/recipe-viewer/${this.recipeId}`);
  }
}
