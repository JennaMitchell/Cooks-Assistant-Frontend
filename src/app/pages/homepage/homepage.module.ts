import { NgModule } from '@angular/core';

import { Homepage } from './homepage.component';

import { RouterModule } from '@angular/router';
import { HomepageTopNavBar } from './homepage-top-nav-bar/homepage-top-nav-bar.component';
import { CommonModule } from '@angular/common';
import { HomepageRecipeSlideshowModule } from './homepage-recipe-slideshow/homepage-recipe-slideshow.module';
import { HomepageFullRecipeSlideshowModule } from './homepage-full-recipe-slideshow/homepage-full-recipe-slideshow';
import { HomepageRecipeCategories } from './homepage-recipe-categories/homepage-recipe-categories.component';
import { HomepageCuisineSectionModule } from './homepage-cuisines-section/homepage-cuisines-section.module';

import { HomepageLearningSectionModule } from './homepage-learning-section/hompage-learning-section.module';
import { HomepageFooter } from './homepage-footer/homepage-footer.component';
import { StoreModule } from '@ngrx/store';

import { ErrorPopupModule } from 'src/app/popups/error/error-popup.module';
import { LoggedInNavBarModule } from 'src/app/nav-bar/logged-in-nav-bar/logged-in-nav-bar.module';
import { LoggedOutNavBarModule } from 'src/app/nav-bar/logged-out-nav-bar/logged-out-nav-bar.module';
import { SuccessPopupModule } from 'src/app/popups/success/success-popup.module';
import { SearchPopupModule } from 'src/app/popups/search-popup/search-popup.module';
import { HomepageCategoryPopupComponent } from 'src/app/popups/homepage-category-popup/homepage-category-popup.component';
import { HomepageMobilePreviewPopupModule } from 'src/app/popups/homepage-mobile-preview-section-popup/homepage-mobile-preview-popup.module';
@NgModule({
  declarations: [
    Homepage,
    HomepageTopNavBar,
    HomepageRecipeCategories,
    HomepageCategoryPopupComponent,
    HomepageFooter,
  ],

  imports: [
    RouterModule.forChild([{ path: '', component: Homepage }]),
    CommonModule,
    HomepageRecipeSlideshowModule,
    HomepageFullRecipeSlideshowModule,
    HomepageCuisineSectionModule,
    HomepageLearningSectionModule,
    StoreModule,
    ErrorPopupModule,
    LoggedInNavBarModule,
    LoggedOutNavBarModule,
    SuccessPopupModule,
    SearchPopupModule,
    HomepageMobilePreviewPopupModule,
  ],
})
export class HomepageModule {}
