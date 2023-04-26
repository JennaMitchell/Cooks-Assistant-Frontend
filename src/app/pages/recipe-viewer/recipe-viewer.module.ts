import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecipeViewerComponent } from './recipe-viewer.component';
import { RouterModule } from '@angular/router';

import { LoggedInNavBarModule } from 'src/app/nav-bar/logged-in-nav-bar/logged-in-nav-bar.module';
import { LoggedOutNavBarModule } from 'src/app/nav-bar/logged-out-nav-bar/logged-out-nav-bar.module';
import { SignupPopupModule } from 'src/app/popups/signup/signup-popup.module';
import { LoginPopupModule } from 'src/app/popups/login/login-popup.module';
import { RecipeTemplateOneViewer } from './templates/template-1/recipe-template-1-viewer.component';
import { RecipeViewerReviewBar } from './review-bar/recipe-viewer-review-bar.component';
import { ErrorPopupModule } from 'src/app/popups/error/error-popup.module';
import { RecipeTemplateTwoViewer } from './templates/template-2/recipe-template-2-viewer.component';
import { RecipeTemplateThreeViewer } from './templates/template-3/recipe-template-3-viewer.component';
@NgModule({
  declarations: [
    RecipeViewerComponent,
    RecipeTemplateOneViewer,
    RecipeTemplateTwoViewer,
    RecipeTemplateThreeViewer,
    RecipeViewerReviewBar,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RecipeViewerComponent }]),
    LoggedInNavBarModule,
    LoggedOutNavBarModule,
    SignupPopupModule,
    LoginPopupModule,
    ErrorPopupModule,
  ],
})
export class RecipeViewerModule {}
