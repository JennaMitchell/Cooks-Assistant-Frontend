import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorPopupComponent } from './error-popup.component';
@NgModule({
  declarations: [ErrorPopupComponent],

  imports: [CommonModule],
  exports: [ErrorPopupComponent],
})
export class ErrorPopupModule {}
