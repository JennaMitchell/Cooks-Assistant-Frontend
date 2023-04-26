import {
  preferenceButtonData,
  mealsTimesButtonData,
} from 'src/app/constants/constants';

export class IconImageRetrieverService {
  recipeTimeIconRetriever(recipeTimeToRetrieve: string) {
    if (recipeTimeToRetrieve.length === 0) {
      return '';
    }
    const possibleFlags: string[] = [];

    for (
      let indexOfNationalityButtonData = 0;
      indexOfNationalityButtonData < mealsTimesButtonData.length;
      indexOfNationalityButtonData++
    ) {
      possibleFlags.push(
        mealsTimesButtonData[indexOfNationalityButtonData].title.toLowerCase()
      );
    }

    const indexOfFlagStringToRetrieve =
      possibleFlags.indexOf(recipeTimeToRetrieve);

    if (indexOfFlagStringToRetrieve < 0) {
      return '';
    }

    return mealsTimesButtonData[indexOfFlagStringToRetrieve].iconLocation;
  }
  preferenceIconRetriever(preferenceToRetrieve: string) {
    if (preferenceToRetrieve.length === 0) {
      return '';
    }
    const possibleFlags: string[] = [];

    for (
      let indexOfNationalityButtonData = 0;
      indexOfNationalityButtonData < preferenceButtonData.length;
      indexOfNationalityButtonData++
    ) {
      possibleFlags.push(
        preferenceButtonData[indexOfNationalityButtonData].title.toLowerCase()
      );
    }

    const indexOfFlagStringToRetrieve =
      possibleFlags.indexOf(preferenceToRetrieve);

    if (indexOfFlagStringToRetrieve < 0) {
      return '';
    }

    return preferenceButtonData[indexOfFlagStringToRetrieve].iconLocation;
  }
}
