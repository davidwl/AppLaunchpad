import { Injectable, NgZone } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Context, addInitListener, addContextUpdateListener } from '@applaunchpad-project/client';
import { IContextMessage, IAppLaunchpadContextTypes, AppLaunchpadContextService } from './applaunchpad-context-service';

@Injectable({
  providedIn: 'root'
})
export class AppLaunchpadContextServiceImpl implements AppLaunchpadContextService {
  private subject: ReplaySubject<IContextMessage> = new ReplaySubject<IContextMessage>(1);
  private currentContext: IContextMessage = (null as unknown) as IContextMessage;

  constructor(private zone: NgZone) {
    addInitListener(initContext => {
      this.addListener(IAppLaunchpadContextTypes.INIT, initContext);
    });
    addContextUpdateListener(updateContext => {
      this.addListener(IAppLaunchpadContextTypes.UPDATE, updateContext);
    });
  }

  public contextObservable(): Observable<IContextMessage> {
    return this.subject.asObservable();
  }

  /**
   * Get latest context object retrieved from applaunchpad core application or none, if not yet set.
   */
  public getContext(): Context {
    return this.currentContext && this.currentContext.context;
  }

  /**
   * Get a promise that resolves when context is set.
   */
  public getContextAsync(): Promise<Context> {
    return new Promise<Context>((resolve, reject) => {
      if (this.getContext()) {
        resolve(this.getContext());
      } else {
        this.contextObservable()
          .pipe(first())
          .subscribe(ctx => {
            resolve(ctx.context);
          });
      }
    });
  }

  /**
   * Set current context
   */
  protected setContext(obj: IContextMessage): void {
    this.zone.run(() => {
      this.currentContext = obj;
      this.subject.next(obj);
    });
  }

  addListener(contextType: IAppLaunchpadContextTypes, context: Context): void {
    this.setContext({
      contextType,
      context
    } as IContextMessage);
  }
}
