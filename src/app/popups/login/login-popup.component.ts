import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';
@Component({
  selector: 'login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css'],
  providers: [],
})
export class LoginPopupComponent {
  constructor(private store: Store) {}
  idIdentifierHandler(inputString: string[]) {
    for (
      let indexOfSplitString = 0;
      indexOfSplitString < inputString.length;
      indexOfSplitString++
    ) {
      if (inputString[indexOfSplitString] === 'password') {
        return 'password';
      }
      if (inputString[indexOfSplitString] === 'username') {
        return 'username';
      }
    }

    return '';
  }

  inputHoverFunction(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const activeElement = document.activeElement as HTMLElement;
    const typeOfTargetElementId = this.idIdentifierHandler(
      targetElement.id.split('-')
    );
    const typeOfActiveElement = this.idIdentifierHandler(
      activeElement.id.split('-')
    );

    if (
      typeOfActiveElement !== typeOfTargetElementId &&
      typeOfActiveElement.length !== 0
    ) {
      targetElement.classList.remove('login-popup-input-container-active');
    } else if (
      typeOfActiveElement === typeOfTargetElementId &&
      typeOfActiveElement.length !== 0
    ) {
      if (
        !targetElement.classList.contains('login-popup-input-container-active')
      ) {
        targetElement.classList.add('login-popup-input-container-active');
      }
    } else {
      targetElement.classList.toggle('login-popup-input-container-active');
    }
  }

  inputExitHoverHandler(event: MouseEvent) {
    const activeElement = document.activeElement as HTMLElement;

    const targetElement = event.target as HTMLElement;

    const typeOfTargetElementId = this.idIdentifierHandler(
      targetElement.id.split('-')
    );
    const typeOfActiveElement = this.idIdentifierHandler(
      activeElement.id.split('-')
    );

    if (typeOfTargetElementId !== typeOfActiveElement) {
      targetElement.classList.remove('login-popup-input-container-active');
      return;
    }
  }

  inputElementClickHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const targetId = targetElement.id;

    const splitId = targetId.split('-');

    const typeOfId = this.idIdentifierHandler(splitId);

    if (typeOfId === 'password') {
      const passwordInput = document.getElementById(
        'login-popup-input-password-container'
      ) as HTMLElement;
      if (
        !passwordInput?.classList.contains('login-popup-input-container-active')
      ) {
        passwordInput.classList.add('login-popup-input-container-active');
      }

      const labelElement = document.getElementById(
        'login-popup-password-input-label'
      );

      if (!labelElement?.classList.contains('login-popup-input-label-moved')) {
        labelElement?.classList.add('login-popup-input-label-moved');
      }
      const parentInputContainer = document.getElementById(
        'login-popup-input-password-container'
      );

      if (
        !parentInputContainer?.classList.contains(
          'login-popup-input-container-active'
        )
      ) {
        parentInputContainer?.classList.add(
          'login-popup-input-container-active'
        );
      }
    }

    if (typeOfId === 'username') {
      const passwordInput = document.getElementById(
        'login-popup-input-username-container'
      ) as HTMLElement;
      if (
        !passwordInput?.classList.contains('login-popup-input-container-active')
      ) {
        passwordInput.classList.add('login-popup-input-container-active');
      }

      const labelElement = document.getElementById(
        'login-popup-username-input-label'
      );

      if (!labelElement?.classList.contains('login-popup-input-label-moved')) {
        labelElement?.classList.add('login-popup-input-label-moved');
      }
      const parentInputContainer = document.getElementById(
        'login-popup-input-username-container'
      );

      if (
        !parentInputContainer?.classList.contains(
          'login-popup-input-container-active'
        )
      ) {
        parentInputContainer?.classList.add(
          'login-popup-input-container-active'
        );
      }
    }

    if (
      targetElement.id !== 'login-popup-username-input' &&
      targetElement.id !== 'login-popup-password-input'
    ) {
      for (
        let indexOfSplitStringTwo = 0;
        indexOfSplitStringTwo < splitId.length;
        indexOfSplitStringTwo++
      ) {
        if (splitId[indexOfSplitStringTwo] === 'password') {
          document.getElementById('login-popup-password-input')?.focus();
          break;
        }
        if (splitId[indexOfSplitStringTwo] === 'username') {
          document.getElementById('login-popup-username-input')?.focus();
          break;
        }
      }
    }
  }

  resetInputContainerHandler() {
    const activeElement = document.activeElement as HTMLElement;
    const typeOfActiveElement = this.idIdentifierHandler(
      activeElement.id.split('-')
    );
    const passwordInput = document.getElementById(
      'login-popup-password-input'
    ) as HTMLInputElement;
    const passwordLabel = document.getElementById(
      'login-popup-password-input-label'
    ) as HTMLLabelElement;

    const passwordContainerInput = document.getElementById(
      'login-popup-input-password-container'
    ) as HTMLDivElement;

    const usernameInput = document.getElementById(
      'login-popup-username-input'
    ) as HTMLInputElement;
    const usernameLabel = document.getElementById(
      'login-popup-username-input-label'
    ) as HTMLLabelElement;
    const usernameContainerInput = document.getElementById(
      'login-popup-input-username-container'
    ) as HTMLDivElement;

    if (
      passwordInput.value.length === 0 &&
      typeOfActiveElement !== 'password'
    ) {
      passwordLabel.classList.remove('login-popup-input-label-moved');
    }
    if (typeOfActiveElement !== 'password') {
      passwordContainerInput.classList.remove(
        'login-popup-input-container-active'
      );
    }

    if (
      usernameInput.value.length === 0 &&
      typeOfActiveElement !== 'username'
    ) {
      usernameLabel.classList.remove('login-popup-input-label-moved');
    }

    if (typeOfActiveElement !== 'username') {
      usernameContainerInput.classList.remove(
        'login-popup-input-container-active'
      );
    }
  }

  closingButtonHandler() {
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
    this.store.dispatch(
      PopupActions.updateLoginpopupactive({ loginPopupActive: false })
    );
  }

  signupButtonHandler() {
    this.store.dispatch(
      PopupActions.updateLoginpopupactive({ loginPopupActive: false })
    );
    this.store.dispatch(
      PopupActions.updateSignuppopupactive({ signupPopupActive: true })
    );
  }
}
