import { TestBed } from '@angular/core/testing';

import { EcommApiServiceService } from './ecomm-api-service.service';

describe('EcommApiServiceService', () => {
  let service: EcommApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcommApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
