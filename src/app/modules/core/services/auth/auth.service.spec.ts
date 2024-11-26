import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './auth.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return if user is logged in TRUE', () => {
    spyOn(window.localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify({ email: 'test@gmail.com' });
    });

    expect(service.isLoggedIn()).toBe(true);
  });

  it('should return if user is logged in FALSE', () => {
    spyOn(window.localStorage, 'getItem').and.callFake(() => {
      return null;
    });
    expect(service.isLoggedIn()).toBe(false);
  });
});
