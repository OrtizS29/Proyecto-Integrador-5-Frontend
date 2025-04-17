import { TestBed } from '@angular/core/testing';

import { BrigadistaDataService } from './brigadista-data.service';

describe('BrigadistaDataService', () => {
  let service: BrigadistaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrigadistaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
