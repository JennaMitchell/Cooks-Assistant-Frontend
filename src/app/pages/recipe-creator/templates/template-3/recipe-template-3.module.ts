import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateRecipeButtonModule } from '../../create-button/create-recipe-button.module';

import { RecipeTemplateThree } from './recipe-template-3.component';

@NgModule({
  declarations: [RecipeTemplateThree],

  imports: [CommonModule, CreateRecipeButtonModule],
  exports: [RecipeTemplateThree],
})
export class RecipeTemplateThreeModule {}
