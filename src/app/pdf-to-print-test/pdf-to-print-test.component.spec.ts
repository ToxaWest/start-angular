import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToPrintTestComponent } from './pdf-to-print-test.component';

describe('PdfToPrintTestComponent', () => {
  let component: PdfToPrintTestComponent;
  let fixture: ComponentFixture<PdfToPrintTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfToPrintTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfToPrintTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
