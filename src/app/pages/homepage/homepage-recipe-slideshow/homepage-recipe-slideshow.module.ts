import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomepageRecipeSlideshow } from './homepage-recipe-slideshow.component';
import { SlideDisplayModule } from './slide-display/slide-display.module';
import { LoadingBarModule } from 'src/app/loading-bar/loading-bar.module';
@NgModule({
  declarations: [HomepageRecipeSlideshow],

  imports: [SlideDisplayModule, CommonModule, LoadingBarModule],
  exports: [HomepageRecipeSlideshow],
})
export class HomepageRecipeSlideshowModule {}
