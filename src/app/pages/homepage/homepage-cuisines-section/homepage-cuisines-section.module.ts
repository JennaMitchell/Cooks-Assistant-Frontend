import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LargeSlideShowCuisineCardModule } from './components/large-cuisine-slideshow-card/large-slideshow-cuisine-card.module';
import { SmallSlideShowCuisineCard } from './components/small-cuisine-slideshow-card/small-slideshow-cuisine-card.component';
import { HomepageCuisinesSection } from './homepage-cuisines-section.component';

@NgModule({
  declarations: [HomepageCuisinesSection, SmallSlideShowCuisineCard],

  imports: [LargeSlideShowCuisineCardModule, CommonModule],
  exports: [HomepageCuisinesSection],
})
export class HomepageCuisineSectionModule {}
