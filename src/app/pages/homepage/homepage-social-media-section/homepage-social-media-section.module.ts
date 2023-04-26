import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HomepageSocialMediaComponent } from './homepage-social-media-section.component';
import { SocialMediaExampleComponentModule } from './components/social-media-example.module';

@NgModule({
  declarations: [HomepageSocialMediaComponent],

  imports: [CommonModule, SocialMediaExampleComponentModule],
  exports: [HomepageSocialMediaComponent],
})
export class HomepageSocialMediaSectionModule {}
