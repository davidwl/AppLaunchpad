import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLaunchpadPreloadComponent } from './applaunchpad.preload.component';

describe('ClientSupportAngularComponent', () => {
  let component: AppLaunchpadPreloadComponent;
  let fixture: ComponentFixture<AppLaunchpadPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLaunchpadPreloadComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLaunchpadPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
