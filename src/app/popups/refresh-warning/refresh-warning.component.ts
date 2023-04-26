import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PopupActions } from 'libs/store/popups/popup-actions.actions';

@Component({
  selector: 'refresh-warning-popup',
  templateUrl: './refresh-warning.component.html',
  styleUrls: ['./refresh-warning.component.css'],
  providers: [],
})
export class RefreshWarningPopupComponent {
  constructor(private store: Store, private router: Router) {}

  confirmButtonClickHandler() {
    if (this.router.url === '/recipe-creator') {
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  }
  cancelButtonClickHandler() {
    this.store.dispatch(
      PopupActions.updateLockwebpageviewport({ lock: false })
    );
    this.store.dispatch(
      PopupActions.updateRefreshwarningpopupactive({
        refreshWarningPopupActive: false,
      })
    );
  }
}
