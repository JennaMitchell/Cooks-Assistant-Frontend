import { Injectable } from '@angular/core';
import { ActivatePopupService } from '../../activate-popup-functions/activate-popup-functions.service';
@Injectable({
  providedIn: 'root',
})
export class ApiErrorService {
  constructor(private activatePopupService: ActivatePopupService) {}
  apiCallErrorHandler = async (status: number, responseObject: any) => {
    if (status === 401 || status === 500) {
      this.activatePopupService.errorPopupHandler(
        `${responseObject.message} ${responseObject.error[0].error}`
      );
      throw new Error(
        `${responseObject.message} ${responseObject.error[0].error}`
      );
    }
  };
}
