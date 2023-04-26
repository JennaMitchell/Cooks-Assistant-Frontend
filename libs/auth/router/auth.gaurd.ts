import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { loggedInSelector } from 'libs/store/auth/auth-selectors';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  loggedInObserver$ = this.store.select(loggedInSelector);
  loggedIn = false;

  ngOnInit() {
    console.log('Guard On');
    this.loggedInObserver$.subscribe((value) => {
      this.loggedIn = value;
      console.log(value);
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(loggedInSelector).pipe(
      map((authenticate) => {
        if (!authenticate) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}

// canActivate:[AuthGuard]
