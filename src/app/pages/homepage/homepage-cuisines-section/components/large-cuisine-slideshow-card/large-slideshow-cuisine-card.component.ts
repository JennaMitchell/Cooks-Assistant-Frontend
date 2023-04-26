import { Component, Input } from '@angular/core';
import { CookingTimeStringConverterService } from 'src/app/utilities/cooking-time-string-converter/cooking-time-string-converter.service';

@Component({
  selector: 'large-slideshow-cuisine-card',
  templateUrl: './large-slideshow-cuisine-card.component.html',
  styleUrls: ['./large-slideshow-cuisine-card.component.css'],
  providers: [CookingTimeStringConverterService],
})
export class LargeSlideShowCuisineCard {
  constructor(
    private cookingTimeStringConverterService: CookingTimeStringConverterService
  ) {}
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
  displayedCookingTime = '';

  ngOnInit() {
    this.displayedCookingTime =
      this.cookingTimeStringConverterService.cookingTimeStringConverter(
        this.cookingTime
      );
  }
}
