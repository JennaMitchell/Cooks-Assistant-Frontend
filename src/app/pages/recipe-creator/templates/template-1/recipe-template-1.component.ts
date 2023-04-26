import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  RecipeCreatorFunctions,
  ReturnedCreatorRecipeDataAndIdsInterface,
} from '../../../../utilities/recipe-creator-functions/recipe-creator-function.service';
import { changeRecipeTemplatePopupActiveSelector } from '../../../../../../libs/store/popups/popup-selectors';
import { RecipeCreatorActions } from 'libs/store/recipe-creator/recipe-creator-actions.actions';
import {
  userHasEnteredDataSelector,
  selectedRecipeTemplateUserData,
  selectedTagsSelector,
  userSelectedRecipeDishImageIndexSelector,
} from 'libs/store/recipe-creator/recipe-creator-selectors';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { dishImagesData } from '../../../../constants/dish-image-data';
import { ActivatePopupService } from '../../../../utilities/activate-popup-functions/activate-popup-functions.service';

interface TextAreaContainersIdsObjectInterface {
  [key: string]: string;
}
@Component({
  selector: 'recipe-template-one',
  templateUrl: './recipe-template-1.component.html',
  styleUrls: ['./recipe-template-1.component.css'],
  providers: [RecipeCreatorFunctions, ActivatePopupService],
})
export class RecipeTemplateOne {
  @Input('editButtonsActive') editButtonsActive = true;

  constructor(
    private store: Store,
    private recipeCreatorFunctions: RecipeCreatorFunctions,
    private activatePopupService: ActivatePopupService
  ) {}

  dishImagesData = dishImagesData;

  editPhotoButtonMouseEnter = false;
  addListElementType = '';
  addListElementclassNameToRetreive = '';
  userSelectedRecipeDishImageIndexObserver$ = this.store.select(
    userSelectedRecipeDishImageIndexSelector
  );

  editPhotoButtonMouseEnterHandler() {
    this.editPhotoButtonMouseEnter = !this.editPhotoButtonMouseEnter;
  }
  selectedTagsObserver$ = this.store.select(selectedTagsSelector);
  selectedTags: string[] = [];
  selectedTagsButtonIds: string[] = [];

  changeRecipeTemplatePopupActiveSelectorObserver$ = this.store.select(
    changeRecipeTemplatePopupActiveSelector
  );
  selectedRecipeTemplateUserDataObserver$ = this.store.select(
    selectedRecipeTemplateUserData
  );

  activeTextAreaId = '';
  userEnteredData = false;
  userHasEnteredDataSelectorObserver$ = this.store.select(
    userHasEnteredDataSelector
  );
  selectedRecipeTemplateUserDataFromStore = {
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
  userEnteredDataFromStore = false;
  textAreaClassNamesToRetrieveObject = {
    ingredients: 'recipe-template-one-ingredient-textarea',
    directions: 'recipe-template-one-directions-textarea',
    notes: 'recipe-template-one-notes-textarea',
  };

  textAreaContainersIdsObject: TextAreaContainersIdsObjectInterface = {
    ingredients: 'recipe-template-one-ingredients-textarea-',
    directions: 'recipe-template-one-directions-textarea-',
    notes: 'recipe-template-one-notes-textarea-',
  };

  ingredientListIds = ['recipe-template-one-ingredients-textarea-0'];
  directionsListIds = ['recipe-template-one-directions-textarea-0'];
  notesListIds = ['recipe-template-one-notes-textarea-0'];

  acceptedListIdTypes = ['ingredients', 'directions', 'notes'];

  listElementDefaultValuesWhenNewItemAddedArray = {
    ingredients: [''],
    directions: [''],
    notes: [''],
  };

  userEnteredTemplateData = {
    title: '',
    quote: '',
    servings: '',
    prepTime: '',
    cookingTime: '',
    ingredientsList: [''],
    directionsList: [''],
    notes: [''],
    description: '',
    selectedRecipeDishImageIndex: 1,
  };

  blankTemplateData = {
    title: '',
    quote: '',
    servings: '',
    prepTime: '',
    cookingTime: '',
    ingredientsList: [''],
    directionsList: [''],
    notes: [''],
    description: '',
    selectedRecipeDishImageIndex: 1,
  };

  editTagsButtonMouseEnter = false;
  dishImageEditButtonHandler() {
    this.activatePopupService.activateRecipeCreatorDishImagePopup();
  }

  deleteTagButtonHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLElement;
    let targetId = targetElement.id;

    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLButtonElement;
      targetId = targetElement.id;
    }

    const splitId = targetId.split('-');

    const selectedTag = splitId[splitId.length - 2];

    const indexOfSelectedTag = this.selectedTags.indexOf(selectedTag);
    this.selectedTags.splice(indexOfSelectedTag, 1);

    this.store.dispatch(
      RecipeCreatorActions.updateSelectedtags({
        selectedTags: this.selectedTags,
      })
    );
  }

  editTagButtonMouseEnterHandler() {
    this.editTagsButtonMouseEnter = !this.editTagsButtonMouseEnter;
  }

  editTagsButtonHandler() {
    this.store.dispatch(PopupActions.updateLockwebpageviewport({ lock: true }));
    this.store.dispatch(
      PopupActions.updateRecipetagspopupactive({ recipeTagsPopupActive: true })
    );
  }

  textAreaInputHandler(event: Event, textAreaType: string) {
    this.userEnteredData = true;

    this.userEnteredTemplateData =
      this.recipeCreatorFunctions.updateLocalRecipeData(
        this.userEnteredTemplateData,
        textAreaType,
        event
      );

    switch (textAreaType) {
      case 'ingredient':
        this.listElementDefaultValuesWhenNewItemAddedArray.ingredients =
          this.userEnteredTemplateData.ingredientsList;
        break;
      case 'direction':
        this.listElementDefaultValuesWhenNewItemAddedArray.directions =
          this.userEnteredTemplateData.directionsList;
        break;
      case 'note':
        this.listElementDefaultValuesWhenNewItemAddedArray.notes =
          this.userEnteredTemplateData.notes;
        break;

      default:
        break;
    }
  }

  deleteTextAreaHandler(event: MouseEvent, type: string) {
    let retrievedData: ReturnedCreatorRecipeDataAndIdsInterface;

    retrievedData = this.recipeCreatorFunctions.deleteEntryButtonHandler(
      event,
      this.acceptedListIdTypes,
      this.userEnteredTemplateData,
      this.textAreaContainersIdsObject
    );

    this.userEnteredTemplateData = retrievedData.templateData;
    this.blankTemplateData = retrievedData.templateData;

    switch (type) {
      case 'ingredients':
        this.ingredientListIds = retrievedData.idsArray;
        break;
      case 'directions':
        this.directionsListIds = retrievedData.idsArray;
        break;
      case 'notes':
        this.ingredientListIds = retrievedData.idsArray;
        break;

      default:
        break;
    }
  }

  addTextAreaHandler(type: string) {
    let retrievedData: ReturnedCreatorRecipeDataAndIdsInterface;

    switch (type) {
      case 'ingredients':
        retrievedData = this.recipeCreatorFunctions.addTextFieldButtonHandler(
          this.userEnteredTemplateData,
          this.ingredientListIds,
          type
        );
        this.userEnteredTemplateData = retrievedData.templateData;
        this.blankTemplateData = retrievedData.templateData;
        this.ingredientListIds = retrievedData.idsArray;

        this.listElementDefaultValuesWhenNewItemAddedArray.ingredients =
          retrievedData.templateData.ingredientsList;

        this.addListElementType = 'ingredients';
        this.addListElementclassNameToRetreive =
          this.textAreaClassNamesToRetrieveObject['ingredients'];

        break;
      case 'directions':
        retrievedData = this.recipeCreatorFunctions.addTextFieldButtonHandler(
          this.userEnteredTemplateData,
          this.directionsListIds,
          type
        );

        this.userEnteredTemplateData = retrievedData.templateData;
        this.blankTemplateData = retrievedData.templateData;
        this.directionsListIds = retrievedData.idsArray;
        this.listElementDefaultValuesWhenNewItemAddedArray.directions =
          retrievedData.templateData.directionsList;
        this.addListElementType = 'directions';
        this.addListElementclassNameToRetreive =
          this.textAreaClassNamesToRetrieveObject['directions'];

        break;
      case 'notes':
        retrievedData = this.recipeCreatorFunctions.addTextFieldButtonHandler(
          this.userEnteredTemplateData,
          this.notesListIds,
          type
        );
        this.userEnteredTemplateData = retrievedData.templateData;
        this.blankTemplateData = retrievedData.templateData;
        this.notesListIds = retrievedData.idsArray;
        this.listElementDefaultValuesWhenNewItemAddedArray.notes =
          retrievedData.templateData.notes;
        this.addListElementType = 'notes';
        this.addListElementclassNameToRetreive =
          this.textAreaClassNamesToRetrieveObject['notes'];

        break;
      default:
        break;
    }
  }

  createButtonClicked(clickedStatus: boolean) {
    if (clickedStatus) {
      this.resetLocalVar();
    }
  }
  resetLocalVar() {
    this.editPhotoButtonMouseEnter = false;
    this.addListElementType = '';
    this.addListElementclassNameToRetreive = '';
    this.selectedTags = [];
    this.selectedTagsButtonIds = [];
    this.activeTextAreaId = '';
    this.userEnteredData = false;
    this.userHasEnteredDataSelectorObserver$ = this.store.select(
      userHasEnteredDataSelector
    );
    this.selectedRecipeTemplateUserDataFromStore = {
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
    this.userEnteredDataFromStore = false;
    this.ingredientListIds = ['recipe-template-one-ingredients-textarea-0'];
    this.directionsListIds = ['recipe-template-one-directions-textarea-0'];
    this.notesListIds = ['recipe-template-one-notes-textarea-0'];
    this.listElementDefaultValuesWhenNewItemAddedArray = {
      ingredients: [''],
      directions: [''],
      notes: [''],
    };
    this.userEnteredTemplateData = {
      title: '',
      quote: '',
      servings: '',
      prepTime: '',
      cookingTime: '',
      ingredientsList: [''],
      directionsList: [''],
      notes: [''],
      description: '',
      selectedRecipeDishImageIndex: 1,
    };
    this.blankTemplateData = {
      title: '',
      quote: '',
      servings: '',
      prepTime: '',
      cookingTime: '',
      ingredientsList: [''],
      directionsList: [''],
      notes: [''],
      description: '',
      selectedRecipeDishImageIndex: 1,
    };
    this.editTagsButtonMouseEnter = false;
  }

  ngOnInit() {
    this.changeRecipeTemplatePopupActiveSelectorObserver$.subscribe((value) => {
      if (value) {
        this.store.dispatch(
          RecipeCreatorActions.updateRecipetemplateuserdata({
            recipeTemplateUserData: this.userEnteredTemplateData,
          })
        );
      }
    });
    this.selectedRecipeTemplateUserDataObserver$.subscribe((value) => {
      this.selectedRecipeTemplateUserDataFromStore = value;
    });

    this.userHasEnteredDataSelectorObserver$.subscribe((value) => {
      this.userEnteredDataFromStore = value;
      if (value) {
        this.userEnteredTemplateData =
          this.selectedRecipeTemplateUserDataFromStore;
        this.blankTemplateData = this.selectedRecipeTemplateUserDataFromStore;
      }
    });

    this.selectedTagsObserver$.subscribe((value: string[]) => {
      this.selectedTags = value.map((tag: string) => {
        return tag.charAt(0).toUpperCase() + tag.slice(1);
      });
      this.selectedTagsButtonIds = value.map((tag: string) => {
        return 'recipe-template-1-' + tag + '-button';
      });
    });
    this.userSelectedRecipeDishImageIndexObserver$.subscribe(
      (value: number) => {
        if (value !== -1) {
          const copyOfUserEnteredTemplateData = JSON.parse(
            JSON.stringify(this.userEnteredTemplateData)
          );
          copyOfUserEnteredTemplateData.selectedRecipeDishImageIndex = value;
          this.userEnteredTemplateData = copyOfUserEnteredTemplateData;
        }
      }
    );
    this.recipeCreatorFunctions.textAreaResizeAllFunction();
    this.resetLocalVar();
  }

  ngAfterViewChecked() {
    this.recipeCreatorFunctions.textAreaResizeAllFunction();
    [this.addListElementclassNameToRetreive, this.addListElementType] =
      this.recipeCreatorFunctions.textAreaValueResetHandler(
        this.addListElementclassNameToRetreive,
        this.userEnteredTemplateData,
        this.addListElementType
      );
  }
}
