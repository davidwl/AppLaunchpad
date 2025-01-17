import { Context } from '@applaunchpad-project/client';
import { Observable } from 'rxjs';

export abstract class AppLaunchpadContextService {
  /**
   * Listen to context changes
   * Receives current value, even if the event was already dispatched earlier.
   */
  abstract contextObservable(): Observable<IContextMessage>;

  /**
   * Get latest set context object (can be null/undefined, if not set yet)
   */
  abstract getContext(): Context;

  /**
   * Get a promise that resolves when context is set.
   */
  abstract getContextAsync(): Promise<Context>;
}

export enum IAppLaunchpadContextTypes {
  INIT,
  UPDATE
}

export interface IContextMessage {
  contextType: IAppLaunchpadContextTypes; // will be init or update
  context: Context;
}
