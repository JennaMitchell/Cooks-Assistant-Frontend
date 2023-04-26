import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateRecipeButtonComponent } from './create-recipe-button.component';

@NgModule({
  declarations: [CreateRecipeButtonComponent],

  imports: [CommonModule],
  exports: [CreateRecipeButtonComponent],
})
export class CreateRecipeButtonModule {}
