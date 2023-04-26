import { Component, Input } from '@angular/core';

@Component({
  selector: 'social-media-example',
  templateUrl: './social-media-example.component.html',
  styleUrls: ['./social-media-example.component.css'],
  providers: [],
})
export class SocialMediaExampleComponent {
  @Input('socialMediaBackgroundImageLocation')
  socialMediaBackgroundImageLocation = '';
  @Input('socialMediaThumbnailImageLocation')
  socialMediaThumbnailImageLocation = '';
  @Input('socialMediaTitle') socialMediaTitle = '';
  @Input('numberOfFollowers') numberOfFollowers = '';
  @Input('socialMediaButtonIconLocation') socialMediaButtonIconLocation = '';
  @Input('socialMediaButtonText') socialMediaButtonText = '';
}
