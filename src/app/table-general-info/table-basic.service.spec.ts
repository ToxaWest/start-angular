import { TestBed, inject } from '@angular/core/testing';

import { TableBasicService } from './table-basic.service';

describe('TableBasicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableBasicService]
    });
  });

  it('should be created', inject([TableBasicService], (service: TableBasicService) => {
    expect(service).toBeTruthy();
  }));
});
