import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LoggedOutNavBar } from './logged-out-nav-bar.component';
@NgModule({
  declarations: [LoggedOutNavBar],

  imports: [CommonModule],
  exports: [LoggedOutNavBar],
})
export class LoggedOutNavBarModule {}
