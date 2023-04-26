import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LargeSlideShowCard } from './large-slideshow-card.component';

@NgModule({
  declarations: [LargeSlideShowCard],

  imports: [CommonModule],
  exports: [LargeSlideShowCard],
})
export class LargeSlideShowCardModule {}
