import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'homepage-full-recipe-slideshow-arrow-bar',
  templateUrl: './homepage-full-recipe-slideshow-arrow-bar.component.html',
  styleUrls: ['./homepage-full-recipe-slideshow-arrow-bar.component.css'],
  providers: [],
})
export class HomepageFullRecipeSlideshowArrowBarComponent {
  @Input('numberOfRecipes') numberOfRecipes = 0;
  @Output('activeNumberOfRecipesRetriever') activenumberOfRecipesRetriever =
    new EventEmitter<number>();
  activeRecipeNumber = 1;
  rightDotsActive = false;
  leftDotsActive = true;
  arrowButtonsActive = true;
  middlePageButtonActive = true;

  ngAfterContentChecked() {
    this.numberOfRecipesHandler(this.numberOfRecipes);
    this.rightDotsActiveLogicHandler();
    this.leftDotsActiveLogicHandler();
  }

  numberOfRecipesHandler(tempnumberOfRecipes: number) {
    if (+tempnumberOfRecipes === 1 || tempnumberOfRecipes === 0) {
      this.rightDotsActive = false;
      this.leftDotsActive = false;
      this.arrowButtonsActive = false;
      this.middlePageButtonActive = false;
    } else if (+tempnumberOfRecipes === 2) {
      this.rightDotsActive = false;
      this.leftDotsActive = false;
      this.arrowButtonsActive = true;
      this.middlePageButtonActive = false;
    } else if (+tempnumberOfRecipes === 3) {
      this.middlePageButtonActive = true;
      this.rightDotsActive = true;
      this.leftDotsActive = false;
      this.arrowButtonsActive = true;
    } else {
      this.middlePageButtonActive = true;
      this.rightDotsActive = false;
      this.leftDotsActive = true;
      this.arrowButtonsActive = true;
    }
  }

  leftDotsActiveLogicHandler() {
    if (this.activeRecipeNumber >= this.numberOfRecipes - 1) {
      this.leftDotsActive = false;
    } else {
      this.leftDotsActive = true;
    }
  }

  rightDotsActiveLogicHandler() {
    if (this.activeRecipeNumber === 1) {
      this.rightDotsActive = false;
    } else {
      this.rightDotsActive = true;
    }
  }

  leftArrowButtonHandler() {
    if (this.activeRecipeNumber === 1) {
      this.activeRecipeNumber = this.numberOfRecipes;
    } else {
      this.activeRecipeNumber = this.activeRecipeNumber - 1;
    }
    this.rightDotsActiveLogicHandler();

    this.leftDotsActiveLogicHandler();
    this.activenumberOfRecipesRetriever.emit(this.activeRecipeNumber);
  }

  rightArrowButtonHandler() {
    if (this.activeRecipeNumber === this.numberOfRecipes) {
      this.activeRecipeNumber = 1;
    } else {
      this.activeRecipeNumber = this.activeRecipeNumber + 1;
    }
    this.rightDotsActiveLogicHandler();

    this.leftDotsActiveLogicHandler();
    this.activenumberOfRecipesRetriever.emit(this.activeRecipeNumber);
  }

  pageNumberButtonHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLButtonElement;
    const targetElementString = targetElement.innerText;

    const pageIndex = +targetElementString;
    if (pageIndex > 0 && pageIndex <= this.numberOfRecipes) {
      this.activeRecipeNumber = pageIndex;
    }
    this.rightDotsActiveLogicHandler();

    this.leftDotsActiveLogicHandler();
    this.activenumberOfRecipesRetriever.emit(this.activeRecipeNumber);
  }
}
