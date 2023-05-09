import { Component, Input, Output, EventEmitter } from '@angular/core';

interface HomepageLearningSectionData {
  title: string;
  sectionId: string;
  buttonData: {
    buttonImgUrl: string;
    buttonImgAltText: string;
    buttonLink: string;
    buttonTitle: string;
  }[];
}

@Component({
  selector: 'homepage-learning-section-info-component',
  templateUrl: './homepage-learning-section-info-component.component.html',
  styleUrls: ['./homepage-learning-section-info-component.component.css'],
  providers: [],
})
export class HomepageLearningSectionInfoComponent {
  @Input('windowWidth810Pixels') windowWidth810Pixels = false;
  @Input('absolutePosition') absolutePosition = '';
  @Input('sectionData') sectionData: HomepageLearningSectionData = {
    title: '',
    sectionId: '',
    buttonData: [
      {
        buttonImgUrl: '',
        buttonLink: '',
        buttonTitle: '',
        buttonImgAltText: '',
      },
    ],
  };

  @Output('updateActiveSection') updateActiveSection =
    new EventEmitter<string>();

  sectionClickHandler(event: MouseEvent) {
    let targetElement = event.target as HTMLElement;
    let targetId = targetElement.id;
    let extractedIdToEmit = '';
    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLElement;
      targetId = targetElement.id;
    }
    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLElement;
      targetId = targetElement.id;
    }
    if (targetId.length === 0) {
      targetElement = targetElement.parentElement as HTMLElement;
      targetId = targetElement.id;
    }

    if (targetId.length !== 0) {
      const splitId = targetId.split('-');
      extractedIdToEmit = splitId[splitId.length - 1];

      this.updateActiveSection.emit(extractedIdToEmit);
    }
  }
}
