import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DishImageChangerPopupComponent } from './dish-image-changer.component';

@NgModule({
  declarations: [DishImageChangerPopupComponent],

  imports: [CommonModule],
  exports: [DishImageChangerPopupComponent],
})
export class DishImageChangerPopupModule {}
