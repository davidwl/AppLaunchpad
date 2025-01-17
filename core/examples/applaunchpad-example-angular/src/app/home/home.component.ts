import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { addInitListener, addContextUpdateListener } from '@applaunchpad-project/client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public message: string;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {
    addInitListener(initialContext => {
      this.message = 'AppLaunchpad Client initialized.';
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });
    addContextUpdateListener(updatedContext => {
      this.message = 'AppLaunchpad Client updated.';
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    });
  }
}
