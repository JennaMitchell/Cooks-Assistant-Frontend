import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { RecipeCreatorActions } from 'libs/store/recipe-creator/recipe-creator-actions.actions';
import { dishImagesData } from 'src/app/constants/dish-image-data';
@Component({
  selector: 'dish-image-changer-popup',
  templateUrl: './dish-image-changer.component.html',
  styleUrls: ['./dish-image-changer.component.css'],
  providers: [],
})
export class DishImageChangerPopupComponent {
  constructor(private store: Store) {}

  dishImagesData = dishImagesData;
  dishImageDataIds: string[] = [];
  activeImageButton: number = -1;

  ngOnInit() {
    const tempIdsArray: string[] = [];

    for (
      let indexOfDishImageData = 0;
      indexOfDishImageData < dishImagesData.length;
      indexOfDishImageData++
    ) {
      tempIdsArray.push(
        `dish-image-changer-image-button-${indexOfDishImageData}`
      );
    }
    this.dishImageDataIds = tempIdsArray;
  }

  closingButtonHandler() {
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
    this.store.dispatch(
      PopupActions.updateRecipechangeimagepopupactive({
        recipeChangeImagePopupActive: false,
      })
    );
  }

  dishImageButtonClickHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLButtonElement;
    let targetId = targetElement.id;
    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLButtonElement;
      targetId = targetElement.id;
    }
    const splitId = targetId.split('-');

    const indexOfSelectedImage = splitId[splitId.length - 1];
    this.activeImageButton = +indexOfSelectedImage;
  }
  submitButtonHandler() {
    this.store.dispatch(
      RecipeCreatorActions.updateUserselectedrecipedishimageindex({
        userSelectedRecipeDishImageIndex: this.activeImageButton,
      })
    );
    this.closingButtonHandler();
  }
}
