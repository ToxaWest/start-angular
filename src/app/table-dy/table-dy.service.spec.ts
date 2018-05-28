import { TestBed, inject } from '@angular/core/testing';

import { TableDyService } from './table-dy.service';

describe('TableDyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableDyService]
    });
  });

  it('should be created', inject([TableDyService], (service: TableDyService) => {
    expect(service).toBeTruthy();
  }));
});
