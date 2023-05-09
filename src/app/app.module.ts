import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { HomepageModule } from './pages/homepage/homepage.module';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { homepageReducers } from 'libs/store/homepage/homepage-reducers';
import { popupReducers } from 'libs/store/popups/popup-reducers';
import { authReducers } from 'libs/store/auth/auth-reducers';
import { recipeCreatorReducers } from 'libs/store/recipe-creator/recipe-creator-reducers';
import { ApiErrorService } from './utilities/api-call-functions/api-error-handler/api-error-handler.service';
import { LoginPopupModule } from './popups/login/login-popup.module';
import { SignupPopupModule } from './popups/signup/signup-popup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RefreshWarningPopupComponent } from './popups/refresh-warning/refresh-warning.component';
import { ErrorPopupModule } from './popups/error/error-popup.module';
import { SuccessPopupModule } from './popups/success/success-popup.module';
import { mediaQueryReducers } from 'libs/store/media-queries/media-queries-reducers';
import { TermsOfServicePopupComponent } from './popups/terms-of-service/terms-of-service-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    RefreshWarningPopupComponent,
    TermsOfServicePopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomepageModule,
    CommonModule,
    LoginPopupModule,
    SignupPopupModule,
    MatFormFieldModule,

    StoreModule.forRoot({
      homepage: homepageReducers,
      popup: popupReducers,
      auth: authReducers,
      recipeCreator: recipeCreatorReducers,
      mediaQuery: mediaQueryReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ErrorPopupModule,
    SuccessPopupModule,
  ],
  providers: [ApiErrorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
