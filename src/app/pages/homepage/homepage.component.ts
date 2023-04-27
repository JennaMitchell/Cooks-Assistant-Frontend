import { Component } from '@angular/core';

import { HomepageApiCallServiceFunctions } from '../../utilities/api-call-functions/homepage-api-call-functions/homepage-api-call-functions.service';
import { Store } from '@ngrx/store';

import {
  homepageCategoryPopupActiveSelector,
  searchPopupActiveSelector,
} from 'libs/store/popups/popup-selectors';
import { loggedInSelector } from 'libs/store/auth/auth-selectors';

@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageApiCallServiceFunctions],
})
export class Homepage {
  loggedInObserver$ = this.store.select(loggedInSelector);

  searchPopupActiveObserver$ = this.store.select(searchPopupActiveSelector);
  homepageCategoryPopupActiveObserver$ = this.store.select(
    homepageCategoryPopupActiveSelector
  );

  loggedIn: any;

  searchPoupActive = false;
  homepageCategoryPopupActive = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.loggedInObserver$.subscribe((value) => {
      this.loggedIn = value;
    });

    this.searchPopupActiveObserver$.subscribe((value) => {
      this.searchPoupActive = value;
    });
    this.homepageCategoryPopupActiveObserver$.subscribe((value) => {
      this.homepageCategoryPopupActive = value;
    });

    document.documentElement.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );
  }
}
