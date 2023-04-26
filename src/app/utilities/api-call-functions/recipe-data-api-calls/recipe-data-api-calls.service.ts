import { Injectable } from '@angular/core';
import { databaseUrl } from 'src/app/constants/constants';
import { ApiErrorService } from '../api-error-handler/api-error-handler.service';
import { UserMakeRecipeEntryInterface } from 'libs/store/auth/auth-reducers';
export interface RecipeTemplateSavedDataInterface {
  title: string;
  quote: string;
  servings: string;
  prepTime: string;
  cookingTime: string;
  ingredientsList: string[];
  directionsList: string[];
  notes: string[];
  description: string;
  selectedRecipeDishImageIndex: number;
  username: string;
  selectedTemplateIndex: number;
  tags: string[];
  ratings: number[];
  numberOfMakes: number;
}

export interface RecipeTemplateSavedDataInterfaceWithId {
  title: string;
  quote: string;
  servings: string;
  prepTime: string;
  cookingTime: string;
  ingredientsList: string[];
  directionsList: string[];
  notes: string[];
  description: string;
  selectedRecipeDishImageIndex: number;
  username: string;
  selectedTemplateIndex: number;
  tags: string[];
  ratings: number[];
  numberOfMakes: number;
  _id: string;
}

export interface GetRecipeDataSuccessfulResponseInterface {
  message: string;
  retrievedData: RecipeTemplateSavedDataInterfaceWithId[];
  status: number;
}

@Injectable({
  providedIn: 'root',
})
export class RecipeDataApiCalls {
  constructor(private apiErrorService: ApiErrorService) {}
  getAllRecipeData = async () => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/get-all-recipe-data`,
        {
          method: 'GET',
        }
      );

      return await fetchedResponse.json();
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  getRecipeDataWithFilter = async (filterText: string) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/get-filtered-recipe-data/${filterText}`,
        {
          method: 'GET',
        }
      );

      return (await fetchedResponse.json()) as GetRecipeDataSuccessfulResponseInterface;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };
  getRecipeDataById = async (id: string) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/get-recipe-by-id/${id}`,
        {
          method: 'GET',
        }
      );

      const awaitedResponse = await fetchedResponse.json();
      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse as GetRecipeDataSuccessfulResponseInterface;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };
  getRecipeDataByTitle = async (title: string) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/get-recipe-by-title/${title}`,
        {
          method: 'GET',
        }
      );

      const awaitedResponse = await fetchedResponse.json();
      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse as GetRecipeDataSuccessfulResponseInterface;
    } catch (err) {
      let message;

      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };
  getRecipeDataByRating = async (greaterValue: number, lessValue: number) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/get-recipe-by-rating/${greaterValue}&&${lessValue}`,
        {
          method: 'GET',
        }
      );

      const awaitedResponse = await fetchedResponse.json();
      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse as GetRecipeDataSuccessfulResponseInterface;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  updateRecipeRatingData = async (id: string, newRatingArray: number[]) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/update-recipe-rating/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRatingArray),
        }
      );

      const awaitedResponse = await fetchedResponse.json();

      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  updateRecipeNumberOfMakes = async (id: string, newNumberOfMakes: number) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/update-recipe-numberOfMakes/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numberOfMakes: newNumberOfMakes }),
        }
      );

      const awaitedResponse = await fetchedResponse.json();

      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  updateUserRatingArray = async (
    username: string,
    newRecipeRatingArray: { recipeId: string; rating: number }[],
    userToken: string
  ) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/auth/update-userRatedRecipesArray`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
          body: JSON.stringify({
            username: username,
            recipeRatingArray: newRecipeRatingArray,
          }),
        }
      );

      const awaitedResponse = await fetchedResponse.json();

      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  updateUserRecipesMadeArray = async (
    username: string,
    newRecipesMadeArray: UserMakeRecipeEntryInterface[],
    userToken: string
  ) => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/auth/update-userMadeRecipesArray`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userToken,
          },
          body: JSON.stringify({
            username: username,
            recipeMadeArray: newRecipesMadeArray,
          }),
        }
      );

      const awaitedResponse = await fetchedResponse.json();

      this.apiErrorService.apiCallErrorHandler(
        fetchedResponse.status,
        awaitedResponse
      );

      return awaitedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };
}
