import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  ButtonDataInterface,
  mealsTimesButtonData,
  preferenceButtonData,
  nationalityButtonData,
} from '../../constants/constants';
import { MediaQueryService } from 'src/app/utilities/media-queries-service/media-queries.service';
import { HomepageActions } from 'libs/store/homepage/homepage.actions';
@Component({
  selector: 'homepage-mobile-preview-popup',
  templateUrl: './homepage-mobile-preview-popup.component.html',
  styleUrls: ['./homepage-mobile-preview-popup.component.css'],
  providers: [MediaQueryService],
})
export class HomepageMobilePreviewPopupComponent {
  constructor(private store: Store) {}

  @Input('buttonsArrayType') buttonsArrayType = '';
  numberOfRows = '';
  retrievedButtonsData: ButtonDataInterface[] = [];
  mealTimesButtonData = mealsTimesButtonData;
  preferenceButtonData = preferenceButtonData;
  nationalityButtonData = nationalityButtonData;

  butttonDataRetriever() {
    switch (this.buttonsArrayType) {
      case 'cooking-time':
        this.retrievedButtonsData = this.mealTimesButtonData;
        this.numberOfRows = 'two';
        break;
      case 'preference':
        this.retrievedButtonsData = this.preferenceButtonData;
        this.numberOfRows = 'three';
        break;
      case 'nationality':
        this.retrievedButtonsData = this.nationalityButtonData;
        this.numberOfRows = 'four';
        break;
      default:
        break;
    }
  }

  buttonIdExtractor(id: string) {
    const indexOfFirstIdDash = id.indexOf('-');
    const firstDashRemovedId = id.slice(indexOfFirstIdDash + 1, id.length);
    const indexOfSecondIdDash = firstDashRemovedId.indexOf('-');
    const extractedId = firstDashRemovedId.slice(0, indexOfSecondIdDash);
    return extractedId;
  }

  categoryButtonClickHandler(event: MouseEvent) {
    let target = event.target as HTMLButtonElement;

    let targetId = target.id;

    if (targetId.length === 0) {
      const parentElement = target.parentElement as HTMLButtonElement;

      targetId = parentElement.id;
      target = parentElement;
    }
    if (targetId.length === 0) {
      const parentElement = target.parentElement as HTMLButtonElement;
      targetId = parentElement.id;
    }

    const extractedId = this.buttonIdExtractor(targetId);

    switch (this.buttonsArrayType) {
      case 'cooking-time':
        this.store.dispatch(
          HomepageActions.updateSelectedhomepagemealtime({
            selectedMealTime: extractedId,
          })
        );

        break;
      case 'preference':
        this.store.dispatch(
          HomepageActions.updateSelectedhomepagemealpreference({
            selectedHomepageMealPreference: extractedId,
          })
        );

        break;
      case 'nationality':
        this.store.dispatch(
          HomepageActions.updateSelectedhomepagemealnationality({
            selectedMealNationality: extractedId,
          })
        );
        break;
      default:
        break;
    }
  }
  updateParentElement() {
    const topElements = document.getElementsByClassName(
      'homepage-mobile-preview-popup-main-container'
    );

    for (
      let indexOfTopElements = 0;
      indexOfTopElements < topElements.length;
      indexOfTopElements++
    ) {
      const moduleNamePlate = topElements[indexOfTopElements]
        .parentElement as HTMLElement;
      moduleNamePlate.style.position = 'absolute';
      moduleNamePlate.style.top = '0px';
      moduleNamePlate.style.left = '0px';
      moduleNamePlate.style.width = '200px';
      moduleNamePlate.style.height = 'max(100%,100%)';
    }
  }

  ngOnInit() {
    this.butttonDataRetriever();
  }
  ngAfterViewInit() {
    this.updateParentElement();
  }
}
