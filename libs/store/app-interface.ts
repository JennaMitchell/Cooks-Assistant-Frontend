import { AuthStateInterface } from './auth/auth-reducers';
import { HomepageStateInterface } from './homepage/homepage-reducers';
import { PopupStateInterface } from './popups/popup-reducers';

export interface AppStateInterface {
  popup: PopupStateInterface;
  auth: AuthStateInterface;
  homepage: HomepageStateInterface;
}
