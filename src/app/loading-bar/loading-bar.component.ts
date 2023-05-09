import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css'],
  providers: [],
})
export class LoadingBarComponent {
  @Input('loadingbarActive') loadingBarActive = false;
  actionBarActive = false;
  loadingTransitionSet = false;
  loadingBarInterval: any;

  moveActionBar() {
    if (this.loadingBarActive) {
      this.loadingTransitionSet = true;
      this.actionBarActive = true;
      setTimeout(() => {
        this.loadingTransitionSet = false;
        this.actionBarActive = false;
      }, 3000);
    } else {
      clearInterval(this.loadingBarInterval);
    }
  }

  ngOnInit() {
    this.moveActionBar();
    this.loadingBarInterval = window.setInterval(() => {
      this.moveActionBar();
    }, 3250);
  }
}
