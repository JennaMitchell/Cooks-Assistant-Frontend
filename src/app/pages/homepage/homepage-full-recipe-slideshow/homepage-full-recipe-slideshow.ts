import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomepageFullSlideshowRecipeCardModule } from './full-slideshow-recipe-card/full-slideshow-recipe-card.module';
import { HomepageFullRecipeSlideshow } from './homepage-full-recipe-slideshow.component';

@NgModule({
  declarations: [HomepageFullRecipeSlideshow],

  imports: [CommonModule, HomepageFullSlideshowRecipeCardModule],
  exports: [HomepageFullRecipeSlideshow],
})
export class HomepageFullRecipeSlideshowModule {}
