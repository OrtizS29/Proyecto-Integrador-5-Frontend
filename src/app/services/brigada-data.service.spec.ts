import { TestBed } from '@angular/core/testing';

import { BrigadaDataService } from './brigada-data.service';

describe('BrigadaDataService', () => {
  let service: BrigadaDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrigadaDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
