import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedInSelector } from 'libs/store/auth/auth-selectors';
import { RecipeDataApiCalls } from '../../utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { GetRecipeDataSuccessfulResponseInterface } from '../../../app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { RecipeTemplateSavedDataInterfaceWithId } from '../../../app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';

import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import {
  recipeBrowserGetAllRatingsSelector,
  recipeBrowserSelectedRatingSelector,
} from 'libs/store/popups/popup-selectors';

import {
  searchPopupInputTextSelector,
  homepageCategoryPopupSelectedCategorySelector,
} from 'libs/store/popups/popup-selectors';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { homepagePopularButtonClickedSelector } from 'libs/store/homepage/homepage-selectors';
import { HomepageActions } from 'libs/store/homepage/homepage.actions';
@Component({
  selector: 'recipe-browser',
  templateUrl: './recipe-browser.component.html',
  styleUrls: ['./recipe-browser.component.css'],
  providers: [RecipeDataApiCalls, ActivatePopupService],
})
export class RecipeBrowerComponent {
  constructor(
    private store: Store,
    private recipeDataApiCalls: RecipeDataApiCalls,
    private activatePopupService: ActivatePopupService
  ) {}

  initRenderComplete = false;
  numberOfItemsPerPage = 9;
  numberOfPages = 0;
  loggedInObserver$ = this.store.select(loggedInSelector);
  loggedIn = false;

  searchPopupInputTextObserver$ = this.store.select(
    searchPopupInputTextSelector
  );
  searchPopupInputText = '';
  homepageCategoryPopupSelectedCategoryObserver$ = this.store.select(
    homepageCategoryPopupSelectedCategorySelector
  );
  homepageCategoryPopupSelectedCategory = '';

  recipeBrowserGetAllRatingsObserver$ = this.store.select(
    recipeBrowserGetAllRatingsSelector
  );

  homepagePopularButtonClickedObserver$ = this.store.select(
    homepagePopularButtonClickedSelector
  );

  userClickedRatingsObserver$ = this.store.select(
    recipeBrowserSelectedRatingSelector
  );

  recipeNavMenuActive = false;

  retrievedRecipeCards: RecipeTemplateSavedDataInterfaceWithId[] = [];

  activeRetrievedRecipeCards: RecipeTemplateSavedDataInterfaceWithId[] = [];
  activePageNumberFromPageNavBar = 0;

  activePageNumberFromChildComponent(pageNumber: number) {
    this.activePageNumberFromPageNavBar = pageNumber;
    this.activeRetrievedRecipeCardsUpdater(this.activePageNumberFromPageNavBar);
  }

  activeRetrievedRecipeCardsUpdater(pageNumber: number) {
    let startingIndexOfActiveCards =
      pageNumber * this.numberOfItemsPerPage - this.numberOfItemsPerPage;

    let endingIndexOfActiveCards =
      (pageNumber - 1) * this.numberOfItemsPerPage +
      this.numberOfItemsPerPage -
      1;

    if (pageNumber === 1) {
      startingIndexOfActiveCards = 1;
      endingIndexOfActiveCards = this.numberOfItemsPerPage;
    }

    if (endingIndexOfActiveCards > this.retrievedRecipeCards.length) {
      endingIndexOfActiveCards = this.retrievedRecipeCards.length;
    }

    this.activeRetrievedRecipeCards = this.retrievedRecipeCards.slice(
      startingIndexOfActiveCards - 1,
      endingIndexOfActiveCards
    );
  }

  ngOnInit() {
    document.documentElement.style.setProperty(
      '--scrollbar-width',
      window.innerWidth - document.documentElement.clientWidth + 'px'
    );
    this.loggedInObserver$.subscribe((value) => {
      this.loggedIn = value;
    });

    this.userClickedRatingsObserver$.subscribe((value) => {
      const greaterValue = value.greaterThan;
      const lessValue = value.lessThan;

      if (greaterValue !== -1 && lessValue !== -1) {
        this.recipeDataApiCalls
          .getRecipeDataByRating(greaterValue, lessValue)
          .then((data: GetRecipeDataSuccessfulResponseInterface) => {
            this.retrievedRecipeCards = data.retrievedData;
            this.numberOfPagesCalculator(this.retrievedRecipeCards);
            this.activeRetrievedRecipeCardsUpdater(1);
          })
          .catch((err: Error) => {
            this.activatePopupService.errorPopupHandler(err.message);
          });

        this.store.dispatch(
          PopupActions.updateRecipebrowserselectedlessthanrating({
            recipeBrowserSelectedLessThanRating: -1,
          })
        );
        this.store.dispatch(
          PopupActions.updateRecipebrowserselectedgreaterthanrating({
            recipeBrowserSelectedGreaterThanRating: -1,
          })
        );
      }
    });

    this.recipeBrowserGetAllRatingsObserver$.subscribe((value) => {
      if (value) {
        this.recipeDataApiCalls
          .getAllRecipeData()
          .then((data: GetRecipeDataSuccessfulResponseInterface) => {
            this.retrievedRecipeCards = data.retrievedData;
            this.numberOfPagesCalculator(this.retrievedRecipeCards);
            this.activeRetrievedRecipeCardsUpdater(1);
            return data;
          })
          .catch((err: Error) => {
            this.activatePopupService.errorPopupHandler(err.message);
          });
        this.store.dispatch(
          PopupActions.updateRecipebrowsergetallratings({
            recipeBrowserGetAllRatings: false,
          })
        );
      }
    });

    this.homepageCategoryPopupSelectedCategoryObserver$.subscribe((value) => {
      this.homepageCategoryPopupSelectedCategory = value;
      if (this.initRenderComplete) {
        this.recipeDataApiCalls
          .getRecipeDataWithFilter(this.homepageCategoryPopupSelectedCategory)
          .then((data: GetRecipeDataSuccessfulResponseInterface) => {
            this.retrievedRecipeCards = data.retrievedData;
            this.numberOfPagesCalculator(this.retrievedRecipeCards);
            this.store.dispatch(
              PopupActions.updateHomepagecategorypopupselectedcategory({
                homepageCategoryPopupSelectedCategory: '',
              })
            );
            this.activeRetrievedRecipeCardsUpdater(1);
            return data;
          })
          .catch((err: Error) => {
            this.activatePopupService.errorPopupHandler(err.message);
          });
      }
    });
    this.searchPopupInputTextObserver$.subscribe((value) => {
      this.searchPopupInputText = value;
      if (this.initRenderComplete) {
        this.recipeDataApiCalls
          .getRecipeDataByTitle(this.searchPopupInputText)
          .then((data: GetRecipeDataSuccessfulResponseInterface) => {
            this.retrievedRecipeCards = data.retrievedData;
            this.numberOfPagesCalculator(this.retrievedRecipeCards);
            this.activeRetrievedRecipeCardsUpdater(1);
            return data;
          })
          .catch((err: Error) => {
            this.activatePopupService.errorPopupHandler(err.message);
          });
      }
    });

    if (
      this.homepageCategoryPopupSelectedCategory.length === 0 &&
      this.searchPopupInputText.length === 0
    ) {
      this.recipeDataApiCalls
        .getAllRecipeData()
        .then((data: GetRecipeDataSuccessfulResponseInterface) => {
          this.retrievedRecipeCards = data.retrievedData;
          this.numberOfPagesCalculator(data.retrievedData);

          this.activeRetrievedRecipeCardsUpdater(1);
          return data;
        })
        .catch((err: Error) => {
          this.activatePopupService.errorPopupHandler(err.message);
        });
    } else if (this.searchPopupInputText.length !== 0) {
      this.recipeDataApiCalls
        .getRecipeDataByTitle(this.searchPopupInputText)
        .then((data: GetRecipeDataSuccessfulResponseInterface) => {
          this.retrievedRecipeCards = data.retrievedData;
          this.numberOfPagesCalculator(this.retrievedRecipeCards);
          this.store.dispatch(
            PopupActions.updateHomepagecategorypopupselectedcategory({
              homepageCategoryPopupSelectedCategory: '',
            })
          );
          this.activeRetrievedRecipeCardsUpdater(1);
          return data;
        })
        .catch((err: Error) => {
          this.activatePopupService.errorPopupHandler(err.message);
        });
      return;
    } else if (this.homepageCategoryPopupSelectedCategory.length !== 0) {
      this.recipeDataApiCalls
        .getRecipeDataWithFilter(this.homepageCategoryPopupSelectedCategory)
        .then((data: GetRecipeDataSuccessfulResponseInterface) => {
          this.retrievedRecipeCards = data.retrievedData;
          this.numberOfPagesCalculator(this.retrievedRecipeCards);
          this.store.dispatch(
            PopupActions.updateHomepagecategorypopupselectedcategory({
              homepageCategoryPopupSelectedCategory: '',
            })
          );
          this.activeRetrievedRecipeCardsUpdater(1);
          return data;
        })
        .catch((err: Error) => {
          this.activatePopupService.errorPopupHandler(err.message);
        });
    }

    this.homepagePopularButtonClickedObserver$.subscribe((value) => {
      if (!this.initRenderComplete && value) {
        this.recipeDataApiCalls
          .getRecipeDataByRating(5, 5)
          .then((data: GetRecipeDataSuccessfulResponseInterface) => {
            this.retrievedRecipeCards = data.retrievedData;

            this.numberOfPagesCalculator(this.retrievedRecipeCards);
            this.store.dispatch(
              HomepageActions.updateHomepagepopularbuttonclicked({
                homepagePopularButtonClicked: false,
              })
            );
            this.activeRetrievedRecipeCardsUpdater(1);
          })
          .catch((err: Error) => {
            this.activatePopupService.errorPopupHandler(err.message);
          });
      }
    });

    this.initRenderComplete = true;
  }

  numberOfPagesCalculator(
    tempRetrievedRecipeCards: RecipeTemplateSavedDataInterfaceWithId[]
  ) {
    const numberOfCardsRetrieved = tempRetrievedRecipeCards.length;

    this.numberOfPages = Math.ceil(
      numberOfCardsRetrieved / this.numberOfItemsPerPage
    );
  }

  userClickedMenuTagsHandler(userClickedTags: string[]) {
    const lowerCaseSelectedTags = userClickedTags.map((tag: string) => {
      return tag.toLowerCase();
    });

    if (lowerCaseSelectedTags.length === 0) {
      this.recipeDataApiCalls
        .getAllRecipeData()
        .then((data: GetRecipeDataSuccessfulResponseInterface) => {
          this.numberOfPagesCalculator(this.retrievedRecipeCards);
          return data;
        })

        .catch((err: Error) => {
          this.activatePopupService.errorPopupHandler(err.message);
        });
    } else {
      this.recipeDataApiCalls
        .getRecipeDataWithFilter(JSON.stringify(lowerCaseSelectedTags))
        .then((data: GetRecipeDataSuccessfulResponseInterface) => {
          this.retrievedRecipeCards = data.retrievedData;
          this.numberOfPagesCalculator(this.retrievedRecipeCards);
          return data;
        })
        .catch((err: Error) => {
          this.activatePopupService.errorPopupHandler(err.message);
        });
    }
  }
  recipeNavMenuClickHandler() {
    this.recipeNavMenuActive = !this.recipeNavMenuActive;
  }
  mobileRecipeNavMenuClickHandler() {
    this.recipeNavMenuActive = false;
  }
}
