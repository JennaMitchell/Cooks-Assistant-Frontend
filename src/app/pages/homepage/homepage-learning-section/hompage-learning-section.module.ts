import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomepageLearningSectionComponent } from './homepage-learning-section.component';
import { HomepageLearningSectionInfoComponent } from './components/homepage-learning-section-info-component';
@NgModule({
  declarations: [
    HomepageLearningSectionComponent,
    HomepageLearningSectionInfoComponent,
  ],

  imports: [CommonModule],
  exports: [HomepageLearningSectionComponent],
})
export class HomepageLearningSectionModule {}
