import { RecipeTemplateUserDataInterface } from 'libs/store/recipe-creator/recipe-creator-reducers';

interface KeyStringInterface {
  [key: string]: string;
}

export interface ReturnedCreatorRecipeDataAndIdsInterface {
  templateData: RecipeTemplateUserDataInterface;
  idsArray: string[];
}

export class RecipeCreatorFunctions {
  textAreaValueResetHandler(
    classNameToRetreive: string,
    userEnteredTemplateData: any,
    elementListType: string
  ) {
    const retrievedTextAreaElements =
      document.getElementsByClassName(classNameToRetreive);

    for (
      let indexOfRetrievedTextAreaElements = 0;
      indexOfRetrievedTextAreaElements < retrievedTextAreaElements.length;
      indexOfRetrievedTextAreaElements++
    ) {
      const textAreaElement = retrievedTextAreaElements[
        indexOfRetrievedTextAreaElements
      ] as HTMLTextAreaElement;

      switch (elementListType) {
        case 'ingredients':
          textAreaElement.value =
            userEnteredTemplateData.ingredientsList[
              indexOfRetrievedTextAreaElements
            ];
          break;
        case 'directions':
          textAreaElement.value =
            userEnteredTemplateData.directionsList[
              indexOfRetrievedTextAreaElements
            ];
          break;
        case 'notes':
          textAreaElement.value =
            userEnteredTemplateData.notes[indexOfRetrievedTextAreaElements];
          break;
        default:
          break;
      }
    }
    return ['', ''];
  }
  updateLocalRecipeData(
    localRecipeData: RecipeTemplateUserDataInterface,
    textAreaType: string,
    changeEvent: Event
  ) {
    const copyOfLocalRecipeData = JSON.parse(JSON.stringify(localRecipeData));
    let targetElement = changeEvent.target as HTMLTextAreaElement;

    let targetId = targetElement.id;

    const elementTextValue = targetElement?.value;

    let ingredientIndex = -1;
    let splitId: string[] = targetId.split('-');
    if (targetId.length === 0) {
      const parentElement = targetElement.parentElement as HTMLElement;

      targetId = targetElement.id;
      splitId = parentElement.id.split('-');
    }

    if (splitId.length !== 0) {
      ingredientIndex = +splitId[splitId.length - 1];
    }

    switch (textAreaType) {
      case 'ingredient':
        copyOfLocalRecipeData.ingredientsList[ingredientIndex] =
          elementTextValue;
        break;
      case 'direction':
        copyOfLocalRecipeData.directionsList[ingredientIndex] =
          elementTextValue;
        break;

      case 'note':
        copyOfLocalRecipeData.notes[ingredientIndex] = elementTextValue;
        break;

      case 'title':
        copyOfLocalRecipeData.title = elementTextValue;
        break;
      case 'quote':
        copyOfLocalRecipeData.quote = elementTextValue;
        break;
      case 'prepTime':
        copyOfLocalRecipeData.prepTime = elementTextValue;
        break;
      case 'cookingTime':
        copyOfLocalRecipeData.cookingTime = elementTextValue;
        break;
      case 'description':
        copyOfLocalRecipeData.description = elementTextValue;
        break;
      case 'servings':
        copyOfLocalRecipeData.servings = elementTextValue;
        break;

      default:
        break;
    }
    return copyOfLocalRecipeData;
  }

  listTextAreaInputHandler(
    event: Event,
    acceptedListIdTypes: string[],
    templateData: RecipeTemplateUserDataInterface
  ) {
    const templateDataCopy = JSON.parse(JSON.stringify(templateData));
    const targetElement = event.target as HTMLTextAreaElement;
    const targetId = targetElement.id;
    const splitTargetId = targetId.split('-');
    let textAreaType = '';
    let textAreaListNumber = -1;
    for (
      let indexOfAcceptedTypes = 0;
      indexOfAcceptedTypes < acceptedListIdTypes.length;
      indexOfAcceptedTypes++
    ) {
      if (splitTargetId.includes(acceptedListIdTypes[indexOfAcceptedTypes])) {
        textAreaType = acceptedListIdTypes[indexOfAcceptedTypes];
      }
    }

    if (textAreaType.length !== 0) {
      textAreaListNumber = +splitTargetId[splitTargetId.length - 1];
    }

    if (textAreaListNumber !== -1) {
      switch (textAreaType) {
        case 'ingredients':
          templateDataCopy.ingredientsList[textAreaListNumber - 1] =
            targetElement.innerText;
          break;
        case 'directions':
          templateDataCopy.directionsList[textAreaListNumber - 1] =
            targetElement.innerText;
          break;
        case 'notes':
          templateDataCopy.notes[textAreaListNumber - 1] =
            targetElement.innerText;
          break;
        default:
          break;
      }
    }

    return templateDataCopy;
  }

  addTextFieldButtonHandler(
    templateData: RecipeTemplateUserDataInterface,
    copyOfIdsList: string[],
    type: string
  ) {
    const tempObject = JSON.parse(JSON.stringify(templateData));
    let tempList: string[] = [];
    const copyOfIdsArray = copyOfIdsList.slice();

    switch (type) {
      case 'ingredients':
        tempList = tempObject.ingredientsList;
        tempList.push('');
        copyOfIdsArray.push(
          `recipe-template-one-ingredients-textarea-${copyOfIdsArray.length}`
        );
        tempObject.ingredientsList = tempList;
        break;
      case 'directions':
        tempList = tempObject.directionsList;
        tempList.push(``);
        copyOfIdsArray.push(
          `recipe-template-one-directions-textarea-${copyOfIdsArray.length}`
        );
        tempObject.directionsList = tempList;

        break;
      case 'notes':
        tempList = tempObject.notes;
        tempList.push(``);
        copyOfIdsArray.push(
          `recipe-template-one-notes-textarea-${copyOfIdsArray.length}`
        );
        tempObject.notesList = tempList;
        break;
      default:
        break;
    }

    return { templateData: tempObject, idsArray: copyOfIdsArray };
  }

  deleteEntryButtonHandler(
    event: MouseEvent,
    acceptedListIdTypes: string[],
    templateData: RecipeTemplateUserDataInterface,
    textAreaContainersIdsObject: KeyStringInterface
  ) {
    let targetElement = event.target as HTMLElement;
    let targetElementId = targetElement.id;
    let targetElementSplitId = targetElementId.split('-');
    const templateDataCopy = JSON.parse(JSON.stringify(templateData));
    let updatedIdsArray: string[] = [];

    for (
      let numberOfParentElements = 0;
      numberOfParentElements < 2;
      numberOfParentElements++
    ) {
      if (targetElementSplitId.includes('textarea')) {
        break;
      } else {
        targetElement = targetElement.parentElement as HTMLElement;
        targetElementId = targetElement.id;
        targetElementSplitId = targetElementId.split('-');
      }
    }

    if (targetElementSplitId.includes('textarea')) {
      const textAreaIndexNumber =
        +targetElementSplitId[targetElementSplitId.length - 1];

      let textAreaContainerIdType = '';

      for (
        let indexOfAcceptedListIdTypes = 0;
        indexOfAcceptedListIdTypes < acceptedListIdTypes.length;
        indexOfAcceptedListIdTypes++
      ) {
        if (
          targetElementSplitId.includes(
            acceptedListIdTypes[indexOfAcceptedListIdTypes]
          )
        ) {
          textAreaContainerIdType =
            acceptedListIdTypes[indexOfAcceptedListIdTypes];
          break;
        }
      }

      if (textAreaContainerIdType.length !== 0) {
        switch (textAreaContainerIdType) {
          case 'ingredients':
            // Removing the text Area from the entered data array

            const copyOfTemplateDataIngredientsList = JSON.parse(
              JSON.stringify(templateDataCopy.ingredientsList)
            );

            copyOfTemplateDataIngredientsList.splice(textAreaIndexNumber, 1);

            // Updating the text area  data array

            templateDataCopy.ingredientsList =
              copyOfTemplateDataIngredientsList;
            // updating the id array with the new relevant ids

            const tempPrefixIdString =
              textAreaContainersIdsObject[textAreaContainerIdType];

            for (
              let indexOfNewIds = 0;
              indexOfNewIds < copyOfTemplateDataIngredientsList.length;
              indexOfNewIds++
            ) {
              updatedIdsArray[indexOfNewIds] =
                tempPrefixIdString + indexOfNewIds;
            }
            break;
          case 'directions':
            // Removing the text Area from the entered data array
            const copyOfTemplateDataDirectionsList = JSON.parse(
              JSON.stringify(templateDataCopy.directionsList)
            );
            copyOfTemplateDataDirectionsList.splice(textAreaIndexNumber, 1);
            // Updating the text area  data array
            templateDataCopy.directionsList = copyOfTemplateDataDirectionsList;
            // updating the id array with the new relevant ids
            const prefixIdString =
              textAreaContainersIdsObject[textAreaContainerIdType];

            for (
              let indexOfNewIds = 0;
              indexOfNewIds < copyOfTemplateDataDirectionsList.length;
              indexOfNewIds++
            ) {
              updatedIdsArray[indexOfNewIds] = prefixIdString + indexOfNewIds;
            }
            break;
          case 'notes':
            // Removing the text Area from the entered data array

            const copyOfTemplateDataNotesList = JSON.parse(
              JSON.stringify(templateDataCopy.notes)
            );

            copyOfTemplateDataNotesList.splice(textAreaIndexNumber, 1);

            // Updating the text area  data array

            templateDataCopy.notes = copyOfTemplateDataNotesList;
            // updating the id array with the new relevant ids

            const notesPrefixIdString =
              textAreaContainersIdsObject[textAreaContainerIdType];

            for (
              let indexOfNewIds = 0;
              indexOfNewIds < copyOfTemplateDataNotesList.length;
              indexOfNewIds++
            ) {
              updatedIdsArray[indexOfNewIds] =
                notesPrefixIdString + indexOfNewIds;
            }
            break;
          default:
            break;
        }
      }
    }
    return { templateData: templateDataCopy, idsArray: updatedIdsArray };
  }

  textAreaResizeAllFunction() {
    const textAreas = document.getElementsByTagName('textarea');
    for (
      let indexOfTextArea = 0;
      indexOfTextArea < textAreas.length;
      indexOfTextArea++
    ) {
      const targetElement = textAreas[indexOfTextArea] as HTMLTextAreaElement;

      targetElement.style.height = '0';
      targetElement.style.height = targetElement.scrollHeight + 'px';
      targetElement.style.resize = 'none';
      targetElement.style.overflowY = 'hidden';
      targetElement.rows = 1;
    }
  }
}
