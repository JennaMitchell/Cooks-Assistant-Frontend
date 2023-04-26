import { databaseUrl } from 'src/app/constants/constants';
import { Injectable } from '@angular/core';
import { ApiErrorService } from '../api-error-handler/api-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class HomepageApiCallServiceFunctions {
  constructor(private apiErrorHandlerService: ApiErrorService) {}
  getAllRecipeData = async () => {
    try {
      const fetchedResponse = await fetch(
        `${databaseUrl}/recipes/get-all-recipe-data`,
        {
          method: 'GET',
        }
      );

      this.apiErrorHandlerService.apiCallErrorHandler(
        fetchedResponse.status,
        await fetchedResponse.json()
      );

      return fetchedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  addNewRecipe = async (recipeData: any) => {
    try {
      const fetchedResponse = await fetch(`${databaseUrl}/recipes/new-recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });
      this.apiErrorHandlerService.apiCallErrorHandler(
        fetchedResponse.status,
        await fetchedResponse.json()
      );

      return fetchedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };
}
