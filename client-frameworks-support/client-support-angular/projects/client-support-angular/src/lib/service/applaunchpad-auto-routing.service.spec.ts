import { TestBed } from '@angular/core/testing';

import { AppLaunchpadAutoRoutingService } from './applaunchpad-auto-routing.service';

describe('AppLaunchpadAutoRoutingService', () => {
  let service: AppLaunchpadAutoRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppLaunchpadAutoRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
