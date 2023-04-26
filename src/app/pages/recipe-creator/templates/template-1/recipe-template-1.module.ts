import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateRecipeButtonModule } from '../../create-button/create-recipe-button.module';

import { RecipeTemplateOne } from './recipe-template-1.component';
import { MatFormFieldModule } from '@angular/material/form-field';
@NgModule({
  declarations: [RecipeTemplateOne],

  imports: [CommonModule, CreateRecipeButtonModule, MatFormFieldModule],
  exports: [RecipeTemplateOne],
})
export class RecipeTemplateOneModule {}
