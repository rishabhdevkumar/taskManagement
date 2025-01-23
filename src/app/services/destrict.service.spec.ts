import { TestBed } from '@angular/core/testing';

import { DestrictService } from './destrict.service';

describe('DestrictService', () => {
  let service: DestrictService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DestrictService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
