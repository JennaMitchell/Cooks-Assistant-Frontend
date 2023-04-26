import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { LoggedInNavBarModule } from 'src/app/nav-bar/logged-in-nav-bar/logged-in-nav-bar.module';
import { LoggedOutNavBarModule } from 'src/app/nav-bar/logged-out-nav-bar/logged-out-nav-bar.module';
import { ErrorPopupModule } from 'src/app/popups/error/error-popup.module';
import { BackgroundChangerPopupModule } from 'src/app/popups/recipe-creator/background-changer/background-changer.module';
import { SuccessPopupModule } from 'src/app/popups/success/success-popup.module';
import { RecipeBrowerNavBarComponent } from './nav-menu/recipe-browser-nav-menu.component';
import { RecipeBrowerComponent } from './recipe-browser.component';
import { RecipeBrowerRecipeCardComponent } from './recipe-card/recipe-browser-recipe-card.component';
import { RecipePageResultsNavigatorComponent } from './page-result-navigator/recipe-page-results-navigator.component';
@NgModule({
  declarations: [
    RecipeBrowerComponent,
    RecipeBrowerNavBarComponent,
    RecipeBrowerRecipeCardComponent,
    RecipePageResultsNavigatorComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RecipeBrowerComponent }]),
    BackgroundChangerPopupModule,
    LoggedInNavBarModule,
    LoggedOutNavBarModule,
    ErrorPopupModule,
    SuccessPopupModule,
  ],
})
export class RecipeBrowserModule {}
