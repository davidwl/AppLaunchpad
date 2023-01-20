import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { getPathParams, linkManager } from '@applaunchpad-project/client';

import { AppLaunchpadContextService, IContextMessage } from '../../../../../services/applaunchpad-context.service';
import { Subscription } from 'rxjs';
import { toTitleCase } from '../../../../../services/helpers';

@Component({
  selector: 'app-group-settings',
  templateUrl: './group-settings.component.html',
  styleUrls: ['./group-settings.component.css']
})
export class GroupSettingsComponent implements OnInit, OnDestroy {
  public linkManager = linkManager;
  public pathParams: { [key: string]: string };
  public groupLabel: string;
  private lcSubscription: Subscription;

  constructor(private applaunchpadService: AppLaunchpadContextService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.lcSubscription = this.applaunchpadService.getContext().subscribe((ctx: IContextMessage) => {
      this.pathParams = getPathParams();
      this.groupLabel = this.pathParams && this.pathParams.group && toTitleCase(this.pathParams.group);
      if (!this.cdr['destroyed']) {
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.lcSubscription) {
      this.lcSubscription.unsubscribe();
    }
  }
}
