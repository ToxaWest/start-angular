import { TestBed, inject } from '@angular/core/testing';

import { TableStateOfClaimService } from './table-state-of-claim.service';

describe('TableStateOfClaimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableStateOfClaimService]
    });
  });

  it('should be created', inject([TableStateOfClaimService], (service: TableStateOfClaimService) => {
    expect(service).toBeTruthy();
  }));
});
