import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';
@Component({
  selector: 'homepage-footer',
  templateUrl: './homepage-footer.component.html',
  styleUrls: ['./homepage-footer.component.css'],
  providers: [MediaQueryService],
})
export class HomepageFooter {
  constructor(
    private mediaQueryService: MediaQueryService,
    private store: Store
  ) {}

  termsOfServiceButtonClickHandler() {
    this.store.dispatch(
      PopupActions.updateTermsofservicepopupactive({
        termsOfServicePopupActive: true,
      })
    );

    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
  }

  ngOnInit() {
    this.mediaQueryService.moduleTopContainer100PercentWidthUpdate(
      'homepage-footer-main-container'
    );
  }
}
