export class NumberOfViewsReturnStringService {
  numberOfViewsConverter(numberOfViews: number) {
    let numberOfViewsReturnString = '';
    let dividedNumberOfViews = 0;

    if (numberOfViews >= 1000 && numberOfViews < 1000000) {
      dividedNumberOfViews = numberOfViews / 1000;

      numberOfViewsReturnString = `${dividedNumberOfViews.toFixed(2)} k`;

      // decimal check

      if (
        +numberOfViewsReturnString[numberOfViewsReturnString.length - 3] ===
          0 &&
        +numberOfViewsReturnString[numberOfViewsReturnString.length - 4] === 0
      ) {
        numberOfViewsReturnString = `${dividedNumberOfViews.toFixed(0)} k`;
      } else if (
        +numberOfViewsReturnString[numberOfViewsReturnString.length - 3] === 0
      ) {
        numberOfViewsReturnString = `${dividedNumberOfViews.toFixed(1)} k`;
      }
    } else if (numberOfViews >= 1000000) {
      dividedNumberOfViews = numberOfViews / 1000000;
      numberOfViewsReturnString = `${dividedNumberOfViews.toFixed(2)} M`;

      if (
        +numberOfViewsReturnString[numberOfViewsReturnString.length - 3] ===
          0 &&
        +numberOfViewsReturnString[numberOfViewsReturnString.length - 4] === 0
      ) {
        numberOfViewsReturnString = `${dividedNumberOfViews.toFixed(0)} M`;
      } else if (
        +numberOfViewsReturnString[numberOfViewsReturnString.length - 3] === 0
      ) {
        numberOfViewsReturnString = `${dividedNumberOfViews.toFixed(1)} M`;
      }
    } else {
      numberOfViewsReturnString = `${numberOfViews}`;
    }
    return numberOfViewsReturnString;
  }
}
