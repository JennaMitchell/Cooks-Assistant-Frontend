import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageLargeSlideShowCardModule } from '../homepage-recipe-slideshow/components/large-slideshow-card/large-slideshow-card.module';
import { HomepageSmallSlideshowCardModule } from '../homepage-recipe-slideshow/components/small-slideshow-card/small-slideshow-card.module';
import { HomepageCuisinesSection } from './homepage-cuisines-section.component';
import { HomepageMobilePreviewPopupModule } from 'src/app/popups/homepage-mobile-preview-section-popup/homepage-mobile-preview-popup.module';
@NgModule({
  declarations: [HomepageCuisinesSection],

  imports: [
    HomepageLargeSlideShowCardModule,
    HomepageSmallSlideshowCardModule,
    CommonModule,
    HomepageMobilePreviewPopupModule,
  ],
  exports: [HomepageCuisinesSection],
})
export class HomepageCuisineSectionModule {}
