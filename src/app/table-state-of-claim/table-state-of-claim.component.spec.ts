import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStateOfClaimComponent } from './table-state-of-claim.component';

describe('TableStateOfClaimComponent', () => {
  let component: TableStateOfClaimComponent;
  let fixture: ComponentFixture<TableStateOfClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableStateOfClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStateOfClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
