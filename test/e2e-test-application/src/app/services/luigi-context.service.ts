import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Context } from '@applaunchpad-project/client';

export type IAppLaunchpadContextTypes = 'init' | 'update';
export interface IContextMessage {
  contextType: IAppLaunchpadContextTypes; // will be init or update
  context: Context;
}

@Injectable()
export class AppLaunchpadContextService {
  private subject: ReplaySubject<IContextMessage> = new ReplaySubject<IContextMessage>(1);

  /**
   * Set current context
   */
  public setContext(obj: IContextMessage): void {
    this.subject.next(obj);
  }

  /**
   * Listen to context changes
   * Receives current value, even if the event was already dispatched earlier.
   */
  public getContext(): Observable<IContextMessage> {
    return this.subject.asObservable();
  }
}
