import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  recipesCreatedIdsArraySelector,
  usernameSelector,
} from 'libs/store/auth/auth-selectors';

import {
  selectedTagsSelector,
  selectedTemplateIndexSelector,
  userSelectedRecipeDishImageIndexSelector,
} from 'libs/store/recipe-creator/recipe-creator-selectors';
import { RecipeCreatorApiService } from 'src/app/utilities/api-call-functions/recipe-creator-api-call-functions/recipe-creator-api-calls.service';
import { Router } from '@angular/router';
import { tokenSelector } from 'libs/store/auth/auth-selectors';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { RecipeTemplateSavedDataInterface } from 'src/app/utilities/api-call-functions/recipe-data-api-calls/recipe-data-api-calls.service';
import { ActivatePopupService } from 'src/app/utilities/activate-popup-functions/activate-popup-functions.service';
import { AuthActions } from 'libs/store/auth/auth.actions';

@Component({
  selector: 'create-recipe-button',
  templateUrl: './create-recipe-button.component.html',
  styleUrls: ['./create-recipe-button.component.css'],
  providers: [RecipeCreatorApiService, ActivatePopupService],
})
export class CreateRecipeButtonComponent {
  @Input() templateData = {
    title: '',
    quote: '',
    servings: '',
    prepTime: '',
    cookingTime: '',
    ingredientsList: [''],
    directionsList: [''],
    notes: [''],
    description: '',
    selectedRecipeDishImageIndex: 0,
  };

  @Output() createButtonClicked = new EventEmitter<boolean>();
  constructor(
    private store: Store,
    private recipeCreatorApiService: RecipeCreatorApiService,
    private router: Router,
    private activePopupService: ActivatePopupService
  ) {}

  selectedTagsObserver$ = this.store.select(selectedTagsSelector);
  selectedTags: string[] = [];
  tokenSelectorObserver$ = this.store.select(tokenSelector);
  userToken = '';

  usernameObserver$ = this.store.select(usernameSelector);
  username = '';

  recipesCreatedIdsArrayObserver$ = this.store.select(
    recipesCreatedIdsArraySelector
  );
  recipesCreatedIdsArray: string[] = [];

  selectedTemplateIndexObserver$ = this.store.select(
    selectedTemplateIndexSelector
  );
  selectedTemplateIndex = 0;

  userSelectedRecipeDishImageIndexObserver$ = this.store.select(
    userSelectedRecipeDishImageIndexSelector
  );
  userSelectedRecipeDishImageIndex = 0;

  emitToTemplate() {
    this.createButtonClicked.emit(true);
  }

  userDataChecker(dataToBeSent: RecipeTemplateSavedDataInterface) {
    if (dataToBeSent.title.length === 0) {
      this.activePopupService.errorPopupHandler('Error: Please enter a title');
      return true;
    }
    if (dataToBeSent.quote.length === 0) {
      this.activePopupService.errorPopupHandler('Error: Please enter a quote');
      return true;
    }
    if (dataToBeSent.servings.length === 0) {
      this.activePopupService.errorPopupHandler(
        'Error: Please enter recipe servings'
      );
      return true;
    }

    if (dataToBeSent.prepTime.length === 0) {
      this.activePopupService.errorPopupHandler(
        'Error: Please enter a prep time'
      );
      return true;
    }
    if (dataToBeSent.cookingTime.length === 0) {
      this.activePopupService.errorPopupHandler(
        'Error: Please enter recipe cooking time'
      );
      return true;
    }
    if (dataToBeSent.ingredientsList.length === 0) {
      this.activePopupService.errorPopupHandler(
        'Error: Please enter recipe ingredients'
      );
      return true;
    }
    if (dataToBeSent.directionsList.length === 0) {
      this.activePopupService.errorPopupHandler(
        'Error: Please enter recipe directions'
      );
      return true;
    }

    if (dataToBeSent.tags.length === 0) {
      this.activePopupService.errorPopupHandler(
        'Error: Please select a recipe tag'
      );
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.usernameObserver$.subscribe((value) => {
      this.username = value;
    });
    this.selectedTemplateIndexObserver$.subscribe((value) => {
      this.selectedTemplateIndex = value;
    });
    this.tokenSelectorObserver$.subscribe((value) => {
      this.userToken = value;
    });
    this.selectedTagsObserver$.subscribe((value) => {
      this.selectedTags = value;
    });
    this.userSelectedRecipeDishImageIndexObserver$.subscribe((value) => {
      this.userSelectedRecipeDishImageIndex = value;
    });

    this.recipesCreatedIdsArrayObserver$.subscribe((value) => {
      this.recipesCreatedIdsArray = value;
    });
  }

  createButtonClick() {
    const dataToBeSent = JSON.parse(JSON.stringify(this.templateData));

    dataToBeSent['username'] = this.username;
    dataToBeSent['selectedTemplateIndex'] = this.selectedTemplateIndex;
    dataToBeSent['tags'] = this.selectedTags;
    dataToBeSent['ratings'] = [];
    dataToBeSent['numberOfMakes'] = 0;
    dataToBeSent['selectedRecipeDishImageIndex'] =
      this.userSelectedRecipeDishImageIndex;

    if (dataToBeSent['description'].length === 0) {
      dataToBeSent['description'] = 'None';
    }

    const errorPresent = this.userDataChecker(dataToBeSent);

    if (!errorPresent) {
      let copyOfRecipesCreatedIdsArray: string[] = [];
      this.recipeCreatorApiService
        .recipeCreatorCall(dataToBeSent, this.userToken)
        .then((data: any) => {
          copyOfRecipesCreatedIdsArray = this.recipesCreatedIdsArray.slice();
          copyOfRecipesCreatedIdsArray.push(data.newRecipeCard._id);

          return this.recipeCreatorApiService.recipeCreatorUpdateUserCreatedRecipesIdsArray(
            {
              createdIdsArray: copyOfRecipesCreatedIdsArray,
              username: data.newRecipeCard.username,
            },
            this.userToken
          );
        })
        .then(() => {
          this.store.dispatch(
            AuthActions.updateRecipescreatedidsarray({
              recipesCreatedIdsArray: copyOfRecipesCreatedIdsArray,
            })
          );
        })
        .then(() => {
          this.emitToTemplate();
        })
        .then(() => {
          this.store.dispatch(
            PopupActions.updateSuccesspopupactive({ successPopupActive: true })
          );
          this.store.dispatch(
            PopupActions.updateSuccesspopuptext({
              successPopupText: 'SUCCESS: Recipe Created',
            })
          );
          this.router.navigateByUrl('/');
          return;
        })
        .catch((err) => {
          let message;
          if (err instanceof Error) message = err.message;
          else message = String(err);
          this.activePopupService.errorPopupHandler(message);
        });
    }
  }
}
