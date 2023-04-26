import { Component } from '@angular/core';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { HomepageActions } from 'libs/store/homepage/homepage.actions';
@Component({
  selector: 'homepage-top-nav-bar',
  templateUrl: './homepage-top-nav-bar.component.html',
  styleUrls: ['./homepage-top-nav-bar.component.css'],
  providers: [ActivatePopupService],
})
export class HomepageTopNavBar {
  recipesButtonHover = false;
  categoriesButtonHover = false;
  popularButtonHover = false;
  searchButtonHover = false;

  constructor(
    private activatePopupService: ActivatePopupService,
    private route: Router,
    private store: Store
  ) {}

  onRecipeButtonHover() {
    this.recipesButtonHover = !this.recipesButtonHover;
  }
  onCategoriesButtonHover() {
    this.categoriesButtonHover = !this.categoriesButtonHover;
  }

  onPopularButtonHover() {
    this.popularButtonHover = !this.popularButtonHover;
  }
  popupButtonClickHandler() {
    this.store.dispatch(
      HomepageActions.updateHomepagepopularbuttonclicked({
        homepagePopularButtonClicked: true,
      })
    );
    this.route.navigate(['recipe-browser']);
  }
  onSearchButtonHover() {
    this.searchButtonHover = !this.searchButtonHover;
  }
  searchButtonClickHandler() {
    this.activatePopupService.searchPopupActiveHandler();
  }
  categoryButtonClickHandler() {
    this.activatePopupService.homepageCategoryPopupHandler();
  }

  ngOnInit() {}
}
