import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'logged-in-nav-bar',
  templateUrl: './logged-in-nav-bar.component.html',
  styleUrls: ['./logged-in-nav-bar.component.css'],
})
export class LoggedInNavBar {
  constructor(private router: Router) {}
  logoutButtonHover = false;
  registerButtonHover = false;
  createButtonHover = false;
  homeButtonHover = false;
  onHomeButtonHover() {
    this.homeButtonHover = !this.homeButtonHover;
  }

  homeButtonClickHandler() {
    this.router.navigate(['/']);
  }

  onLogoutButtonHover() {
    this.logoutButtonHover = !this.logoutButtonHover;
  }
  onRecipesButtonHover() {
    this.registerButtonHover = !this.registerButtonHover;
  }
  onCreateButtonHover() {
    this.createButtonHover = !this.createButtonHover;
  }

  recipesButtonClickHandler() {
    this.router.navigate(['/recipe-browser']);
  }

  createButtonClickHandler() {
    this.router.navigateByUrl('/recipe-creator');
  }
  logoutHandler() {
    this.router.navigateByUrl('/');
  }
}
