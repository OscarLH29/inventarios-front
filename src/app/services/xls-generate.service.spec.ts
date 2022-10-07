import { TestBed } from '@angular/core/testing';

import { XlsGenerateService } from './xls-generate.service';

describe('XlsGenerateService', () => {
  let service: XlsGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XlsGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
