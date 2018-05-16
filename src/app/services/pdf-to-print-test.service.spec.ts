import { TestBed, inject } from '@angular/core/testing';

import { PdfToPrintTestService } from './pdf-to-print-test.service';

describe('PdfToPrintTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfToPrintTestService]
    });
  });

  it('should be created', inject([PdfToPrintTestService], (service: PdfToPrintTestService) => {
    expect(service).toBeTruthy();
  }));
});
