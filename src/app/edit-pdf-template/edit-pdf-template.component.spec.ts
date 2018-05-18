import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPdfTemplateComponent } from './edit-pdf-template.component';

describe('EditPdfTemplateComponent', () => {
  let component: EditPdfTemplateComponent;
  let fixture: ComponentFixture<EditPdfTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPdfTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPdfTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
