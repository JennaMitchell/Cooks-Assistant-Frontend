import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomepageRecipeSlideshow } from './homepage-recipe-slideshow.component';
import { SlideDisplayModule } from './slide-display/slide-display.module';
@NgModule({
  declarations: [HomepageRecipeSlideshow],

  imports: [SlideDisplayModule, CommonModule],
  exports: [HomepageRecipeSlideshow],
})
export class HomepageRecipeSlideshowModule {}
