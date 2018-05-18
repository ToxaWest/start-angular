import { TestBed, inject } from '@angular/core/testing';

import { PdfTemplateService } from './pdf-template.service';

describe('PdfTemplateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfTemplateService]
    });
  });

  it('should be created', inject([PdfTemplateService], (service: PdfTemplateService) => {
    expect(service).toBeTruthy();
  }));
});
