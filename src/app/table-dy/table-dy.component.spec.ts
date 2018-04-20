import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDyComponent } from './table-dy.component';

describe('TableDyComponent', () => {
  let component: TableDyComponent;
  let fixture: ComponentFixture<TableDyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
