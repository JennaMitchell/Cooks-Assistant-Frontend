import { NgModule } from '@angular/core';
import { SearchPopupComponent } from './search-popup.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SearchPopupComponent],

  imports: [CommonModule],
  exports: [SearchPopupComponent],
})
export class SearchPopupModule {}
