import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'large-slideshow-card',
  templateUrl: './large-slideshow-card.component.html',
  styleUrls: ['./large-slideshow-card.component.css'],
  providers: [],
})
export class LargeSlideShowCard {
  constructor(private router: Router) {}
  @Input('title') title = '';
  @Input('imageUrl') imageUrl = '';
  @Input('cookingTime') cookingTime = '';
  @Input('tagsImageArray') tagsImageArray: {
    title: string;
    iconLocation: string;
    id: string;
    altText: string;
  }[] = [];
  @Input('recipeId') recipeId = '';
  cardClickHandler() {
    this.router.navigateByUrl(`/recipe-viewer/${this.recipeId}`);
  }
  ngOnChanges() {
    this.cookingTimeCleaner();
  }

  ngOnInit() {
    this.cookingTimeCleaner();
  }

  cookingTimeCleaner() {
    const seperatedCookingTime = this.cookingTime.split(' ');
    let tempCookingTime = '';

    for (
      let indexOfSeperatedCookingTime = 0;
      indexOfSeperatedCookingTime < seperatedCookingTime.length;
      indexOfSeperatedCookingTime++
    ) {
      tempCookingTime =
        tempCookingTime +
        ' ' +
        seperatedCookingTime[indexOfSeperatedCookingTime];
    }

    this.cookingTime = tempCookingTime;
  }
}
