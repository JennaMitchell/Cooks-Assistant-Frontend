import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FullSlideshowRecipeCard } from './full-slideshow-recipe-card.component';

@NgModule({
  declarations: [FullSlideshowRecipeCard],

  imports: [CommonModule],
  exports: [FullSlideshowRecipeCard],
  providers: [],
})
export class HomepageFullSlideshowRecipeCardModule {}
