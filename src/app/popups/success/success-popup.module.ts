import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SuccessPopupComponent } from './success-popup.component';
@NgModule({
  declarations: [SuccessPopupComponent],

  imports: [CommonModule],
  exports: [SuccessPopupComponent],
})
export class SuccessPopupModule {}
