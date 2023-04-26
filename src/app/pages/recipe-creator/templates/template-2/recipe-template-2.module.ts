import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CreateRecipeButtonModule } from '../../create-button/create-recipe-button.module';

import { RecipeTemplateTwo } from './recipe-template-2.component';

@NgModule({
  declarations: [RecipeTemplateTwo],

  imports: [CommonModule, CreateRecipeButtonModule],
  exports: [RecipeTemplateTwo],
})
export class RecipeTemplateTwoModule {}
