import { NgModule } from '@angular/core';
import { LoggedInNavBar } from './logged-in-nav-bar.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [LoggedInNavBar],

  imports: [CommonModule],
  exports: [LoggedInNavBar],
})
export class LoggedInNavBarModule {}
