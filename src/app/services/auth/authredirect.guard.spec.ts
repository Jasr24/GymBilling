import { TestBed } from '@angular/core/testing';

import { AuthredirectGuard } from './authredirect.guard';

describe('AuthredirectGuard', () => {
  let guard: AuthredirectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthredirectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
