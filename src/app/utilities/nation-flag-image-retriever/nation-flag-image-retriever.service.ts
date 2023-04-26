import { nationalityButtonData } from 'src/app/constants/constants';

export class NationFlagImageRetrieverService {
  nationFlagImageRetriever(flagStringToRetrieve: string) {
    if (flagStringToRetrieve.length === 0) {
      return '';
    }
    const possibleFlags: string[] = [];

    for (
      let indexOfNationalityButtonData = 0;
      indexOfNationalityButtonData < nationalityButtonData.length;
      indexOfNationalityButtonData++
    ) {
      possibleFlags.push(
        nationalityButtonData[indexOfNationalityButtonData].title.toLowerCase()
      );
    }

    const indexOfFlagStringToRetrieve =
      possibleFlags.indexOf(flagStringToRetrieve);

    if (indexOfFlagStringToRetrieve < 0) {
      return '';
    }

    return nationalityButtonData[indexOfFlagStringToRetrieve].iconLocation;
  }
}
