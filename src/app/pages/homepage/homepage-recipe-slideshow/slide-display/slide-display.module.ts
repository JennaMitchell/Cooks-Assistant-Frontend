import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageLargeSlideShowCardModule } from '../components/large-slideshow-card/large-slideshow-card.module';
import { HomepageSmallSlideshowCardModule } from '../components/small-slideshow-card/small-slideshow-card.module';
import { SlideDisplay } from './slide-display.component';

@NgModule({
  declarations: [SlideDisplay],

  imports: [
    CommonModule,
    HomepageSmallSlideshowCardModule,
    HomepageLargeSlideShowCardModule,
  ],
  exports: [SlideDisplay],
})
export class SlideDisplayModule {}
