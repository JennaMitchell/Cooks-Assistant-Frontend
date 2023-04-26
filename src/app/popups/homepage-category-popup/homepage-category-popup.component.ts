import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';

import {
  preferenceButtonData,
  nationalityButtonData,
  mealsTimesButtonData,
  recipeCourseTagData,
  mainIngredientsData,
} from '../../constants/constants';

@Component({
  selector: 'homepage-category-popup',
  templateUrl: './homepage-category-popup.component.html',
  styleUrls: ['./homepage-category-popup.component.css'],
  providers: [],
})
export class HomepageCategoryPopupComponent {
  constructor(private store: Store, private router: Router) {}
  preferenceButtonData = preferenceButtonData;
  nationalityButtonData = nationalityButtonData;
  mealsTimesButtonData = mealsTimesButtonData;
  recipeCourseTagData = recipeCourseTagData;
  mainIngredientsData = mainIngredientsData;

  selectedTags: string[] = [];
  acceptableTags: string[] = [];
  ngOnInit() {
    const preferenceButtonTags = preferenceButtonData.map((data) => {
      return data.title.toLowerCase();
    });
    const nationalityButtonTags = nationalityButtonData.map((data, index) => {
      return data.title.toLowerCase();
    });

    const mealsTimesTags = mealsTimesButtonData.map((data, index) => {
      return data.title.toLowerCase();
    });

    const recipeCourseTags = recipeCourseTagData.map((data) => {
      return data.title.toLowerCase();
    });
    const mainIngredientsDataTags = mainIngredientsData.map((data) => {
      return data.title.toLowerCase();
    });
    this.acceptableTags = mealsTimesTags.concat(
      preferenceButtonTags,
      nationalityButtonTags,
      recipeCourseTags,
      mainIngredientsDataTags
    );
  }

  closingButtonHandler() {
    this.store.dispatch(
      PopupActions.updateHomepagecategorypopupselectedcategory({
        homepageCategoryPopupSelectedCategory: '',
      })
    );
    this.store.dispatch(
      PopupActions.updateHomepagecategorypopupactive({
        homepageCategoryPopupActive: false,
      })
    );
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
  }

  categoryButtonClickHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLElement;
    let targetId = targetElement.id;

    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLElement;
      targetId = targetElement.id;
    }

    if (targetId.length !== 0) {
      const splitId = targetId.split('-');
      const buttonTag = splitId[1];

      if (this.acceptableTags.includes(buttonTag)) {
        this.store.dispatch(
          PopupActions.updateHomepagecategorypopupselectedcategory({
            homepageCategoryPopupSelectedCategory: buttonTag,
          })
        );
        this.store.dispatch(
          PopupActions.updateHomepagecategorypopupactive({
            homepageCategoryPopupActive: false,
          })
        );
        this.store.dispatch(
          PopupActions.updateLockwebpageviewport({ lock: false })
        );
        this.router.navigate(['/recipe-browser']);
      }
    }
  }
}
