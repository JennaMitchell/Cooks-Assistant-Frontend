import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'recipe-page-results-navigator',
  templateUrl: './recipe-page-results-navigator.component.html',
  styleUrls: ['./recipe-page-results-navigator.component.css'],
  providers: [],
})
export class RecipePageResultsNavigatorComponent {
  constructor(private store: Store) {}

  @Input('numberOfPages') numberOfPages = 0;
  @Output('activeNumberOfPagesRetriever') activeNumberOfPagesRetriever =
    new EventEmitter<number>();
  activePageNumber = 1;
  rightDotsActive = false;
  leftDotsActive = true;
  arrowButtonsActive = true;
  middlePageButtonActive = true;

  middlePageButtonValue = this.numberOfPages - 1;

  ngAfterContentChecked() {
    this.numberOfPagesHandler(this.numberOfPages);
    this.middlePageButtonValueHandler();
    this.rightDotsActiveLogicHandler();
    this.middlePageButtonValueHandler();
    this.leftDotsActiveLogicHandler();
  }

  numberOfPagesHandler(tempNumberOfPages: number) {
    if (+tempNumberOfPages === 1 || tempNumberOfPages === 0) {
      this.rightDotsActive = false;
      this.leftDotsActive = false;
      this.arrowButtonsActive = false;
      this.middlePageButtonActive = false;
    } else if (+tempNumberOfPages === 2) {
      this.rightDotsActive = false;
      this.leftDotsActive = false;
      this.arrowButtonsActive = true;
      this.middlePageButtonActive = false;
    } else if (+tempNumberOfPages === 3) {
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

  middlePageButtonValueHandler() {
    if (this.activePageNumber === 1) {
      this.middlePageButtonValue = this.numberOfPages - 1;
    } else if (this.activePageNumber === this.numberOfPages) {
      this.middlePageButtonValue = 2;
    } else {
      this.middlePageButtonValue = this.activePageNumber;
    }
  }

  leftDotsActiveLogicHandler() {
    if (this.activePageNumber >= this.numberOfPages - 1) {
      this.leftDotsActive = false;
    } else {
      this.leftDotsActive = true;
    }
  }

  rightDotsActiveLogicHandler() {
    if (this.activePageNumber === 1) {
      this.rightDotsActive = false;
    } else {
      this.rightDotsActive = true;
    }
  }

  leftArrowButtonHandler() {
    if (this.activePageNumber === 1) {
      this.activePageNumber = this.numberOfPages;
    } else {
      this.activePageNumber = this.activePageNumber - 1;
    }
    this.rightDotsActiveLogicHandler();
    this.middlePageButtonValueHandler();
    this.leftDotsActiveLogicHandler();
    this.activeNumberOfPagesRetriever.emit(this.activePageNumber);
  }

  rightArrowButtonHandler() {
    if (this.activePageNumber === this.numberOfPages) {
      this.activePageNumber = 1;
    } else {
      this.activePageNumber = this.activePageNumber + 1;
    }
    this.rightDotsActiveLogicHandler();
    this.middlePageButtonValueHandler();
    this.leftDotsActiveLogicHandler();
    this.activeNumberOfPagesRetriever.emit(this.activePageNumber);
  }

  pageNumberButtonHandler(event: MouseEvent) {
    const targetElement = event.target as HTMLButtonElement;
    const targetElementString = targetElement.innerText;

    const pageIndex = +targetElementString;
    if (pageIndex > 0 && pageIndex <= this.numberOfPages) {
      this.activePageNumber = pageIndex;
    }
    this.rightDotsActiveLogicHandler();
    this.middlePageButtonValueHandler();
    this.leftDotsActiveLogicHandler();
    this.activeNumberOfPagesRetriever.emit(this.activePageNumber);
  }
}
