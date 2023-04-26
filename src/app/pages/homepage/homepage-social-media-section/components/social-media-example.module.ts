import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SocialMediaExampleComponent } from './social-media-example.component';

@NgModule({
  declarations: [SocialMediaExampleComponent],

  imports: [CommonModule],
  exports: [SocialMediaExampleComponent],
})
export class SocialMediaExampleComponentModule {}
