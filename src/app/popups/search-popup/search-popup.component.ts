import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.css'],
  providers: [],
})
export class SearchPopupComponent {
  constructor(private store: Store, private router: Router) {}

  inputContainerActive = false;

  backdropClickHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement.className === 'search-popup-backdrop') {
      this.closingPopupHandler();
    }
  }

  closingPopupHandler() {
    this.store.dispatch(
      PopupActions.updateSearchpopupactive({ searchPopupActive: false })
    );
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
  }

  inputContainerClickHandler() {
    const inputElement = document.getElementsByClassName(
      'search-popup-search-input'
    )[0] as HTMLInputElement;
    inputElement.focus();
    this.inputContainerActive = true;
  }

  inputEnterKeyPressHandler(event: KeyboardEvent) {
    const keyPressed = event.key;
    if (keyPressed === 'Enter') {
      const inputElement = document.getElementsByClassName(
        'search-popup-search-input'
      )[0] as HTMLInputElement;
      const inputText = inputElement.value;
      this.store.dispatch(
        PopupActions.updateSearchpopupinputtext({
          searchPopupInputText: inputText,
        })
      );
      this.closingPopupHandler();
      this.router.navigate(['/recipe-browser']);
    }
  }

  outsideOfInputContainerClickHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (
      targetElement.className === 'search-popup-search-input' ||
      targetElement.className === 'search-popup-search-input-container'
    ) {
      this.inputContainerClickHandler();
    } else {
      this.inputContainerActive = false;
    }
  }
}
