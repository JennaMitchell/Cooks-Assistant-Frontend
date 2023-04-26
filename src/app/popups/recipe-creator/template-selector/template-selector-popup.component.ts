import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { RecipeCreatorActions } from 'libs/store/recipe-creator/recipe-creator-actions.actions';
@Component({
  selector: 'template-selector-popup',
  templateUrl: './template-selector-popup.component.html',
  styleUrls: ['./template-selector-popup.component.css'],
  providers: [],
})
export class TemplateSelectorPopup {
  constructor(private store: Store) {}
  closingButtonHandler = () => {
    this.store.dispatch(
      PopupActions.updateChangerecipetemplatepopupactive({
        changeRecipeTemplatePopupActive: false,
      })
    );
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
  };
  selectedTemplateIndex = -1;
  submitButtonEnabled = false;

  recipeTemplatesImageData = [
    {
      imageLocation: 'url(../../../../assets/images/templates/template-1.png)',
      id: 'template-selector-template-button-0',
    },
    {
      imageLocation: 'url(../../../../assets/images/templates/template-2.png)',
      id: 'template-selector-template-button-1',
    },
    {
      imageLocation: 'url(../../../../assets/images/templates/template-3.png)',
      id: 'template-selector-template-button-2',
    },
  ];

  resetActiveTemplates() {
    for (
      let recipeTemplatesImageDataIndex = 0;
      recipeTemplatesImageDataIndex < this.recipeTemplatesImageData.length;
      recipeTemplatesImageDataIndex++
    ) {
      const retrievedButton = document.getElementById(
        this.recipeTemplatesImageData[recipeTemplatesImageDataIndex].id
      ) as HTMLButtonElement;
      retrievedButton.classList.remove(
        'template-selector-active-template-button'
      );
    }
  }

  recipeTemplateSelectorButtonHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLButtonElement;
    const targetId = targetElement.id;
    const splitTargetId = targetId.split('-');
    const selectedIndex = +splitTargetId[splitTargetId.length - 1];

    if (selectedIndex !== this.selectedTemplateIndex) {
      this.resetActiveTemplates();
      this.selectedTemplateIndex = selectedIndex;
      this.submitButtonEnabled = true;
      targetElement.classList.add('template-selector-active-template-button');
    } else {
      this.resetActiveTemplates();
      this.selectedTemplateIndex = -1;
      this.submitButtonEnabled = false;
    }
  }

  submitButtonHandler() {
    this.store.dispatch(
      RecipeCreatorActions.updateSelectedtemplateindex({
        selectedTemplateIndex: this.selectedTemplateIndex + 1,
      })
    );
    this.closingButtonHandler();
  }
  submitButtonHoverHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLButtonElement;
    if (!targetElement.disabled) {
      targetElement.classList.toggle(
        'template-selector-submit-button-active-hover'
      );
    }
  }
}
