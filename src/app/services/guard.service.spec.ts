import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { GuardService } from './guard.service';
import { DataService } from './data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

describe('GuardService', () => {
  let service: GuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', redirectTo: '' }
        ])
      ]
    });
    service = TestBed.inject(GuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should can activate true',
    inject([DataService], (dataService) => {
      const route = {} as ActivatedRouteSnapshot;
      const state = {} as RouterStateSnapshot;
      dataService.setToken('token');
      expect(service.canActivate(route, state)).toBeTruthy();
    })
  );

  it('should can activate false',
    inject([DataService], (dataService) => {
      const route = {} as ActivatedRouteSnapshot;
      const state = {} as RouterStateSnapshot;
      dataService.removeToken();
      expect(service.canActivate(route, state)).toBeFalsy();
    })
  );
});
