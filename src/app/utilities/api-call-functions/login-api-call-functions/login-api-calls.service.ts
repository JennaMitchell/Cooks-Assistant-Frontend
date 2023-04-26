import { databaseUrl } from 'src/app/constants/constants';
import { Injectable } from '@angular/core';
import { ApiErrorService } from '../api-error-handler/api-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class LoginApiCallsService {
  constructor(private apiErrorHandlerService: ApiErrorService) {}
  signupCall = async (signupData: any) => {
    try {
      const fetchedResponse = await fetch(`${databaseUrl}/auth/signup`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify(signupData),
      });

      const jsonedResponse = await fetchedResponse.json();

      this.apiErrorHandlerService.apiCallErrorHandler(
        fetchedResponse.status,
        jsonedResponse
      );

      return jsonedResponse;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      throw new Error(`${message}`);
    }
  };

  loginCall = async (loginData: any) => {
    try {
      const fetchedResponse = await fetch(`${databaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'applicaiton/json',
        },
        body: JSON.stringify(loginData),
      });

      const jsonedResponse = await fetchedResponse.json();

      this.apiErrorHandlerService.apiCallErrorHandler(
        fetchedResponse.status,
        jsonedResponse
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
