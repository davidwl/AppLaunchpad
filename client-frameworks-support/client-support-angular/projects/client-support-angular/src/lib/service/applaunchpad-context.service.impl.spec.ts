import { TestBed } from '@angular/core/testing';
import { AppLaunchpadContextServiceImpl } from './applaunchpad-context.service.impl';

describe('AppLaunchpadContextService', () => {
  let service: AppLaunchpadContextServiceImpl;

  // @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLaunchpadContextServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
