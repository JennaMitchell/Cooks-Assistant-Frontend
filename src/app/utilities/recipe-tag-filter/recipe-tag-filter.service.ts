import {
  preferenceButtonData,
  nationalityButtonData,
  mealsTimesButtonData,
  recipeCourseTagData,
  mainIngredientsData,
} from '../../../app/constants/constants';
export class RecipeTagFilter {
  preferenceButtonData = preferenceButtonData;
  nationalityButtonData = nationalityButtonData;
  mealsTimesButtonData = mealsTimesButtonData;
  recipeCourseTagData = recipeCourseTagData;
  mainIngredientsData = mainIngredientsData;

  recipeTagFilter = (tagToFind: string) => {
    if (tagToFind.length === 0) {
      return { title: '', iconLocation: '', id: '', altText: '' };
    }

    const lowercaseTagToFind = tagToFind.toLowerCase();

    const foundPrefrenceData = this.preferenceButtonData.filter(
      (dataEntry) => dataEntry.title.toLowerCase() === lowercaseTagToFind
    );
    if (foundPrefrenceData.length !== 0) {
      return foundPrefrenceData[0];
    }

    const foundNationalityData = this.nationalityButtonData.filter(
      (dataEntry) => dataEntry.title.toLowerCase() === lowercaseTagToFind
    );

    if (foundNationalityData.length !== 0) {
      return foundNationalityData[0];
    }

    const foundMealsTimesButtonData = this.mealsTimesButtonData.filter(
      (dataEntry) => dataEntry.title.toLowerCase() === lowercaseTagToFind
    );

    if (foundMealsTimesButtonData.length !== 0) {
      return foundMealsTimesButtonData[0];
    }

    const foundRecipeCourseTagData = this.recipeCourseTagData.filter(
      (dataEntry) => dataEntry.title.toLowerCase() === lowercaseTagToFind
    );
    if (foundRecipeCourseTagData.length !== 0) {
      return foundRecipeCourseTagData[0];
    }

    const foundMainIngredientsData = this.mainIngredientsData.filter(
      (dataEntry) => dataEntry.title.toLowerCase() === lowercaseTagToFind
    );
    if (foundMainIngredientsData.length !== 0) {
      return foundMainIngredientsData[0];
    }
    return { title: '', iconLocation: '', id: '', altText: '' };
  };
}
