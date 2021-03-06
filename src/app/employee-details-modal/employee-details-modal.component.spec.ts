import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsModalComponent } from './employee-details-modal.component';

describe('EmployeeModalComponent', () => {
  let component: EmployeeDetailsModalComponent;
  let fixture: ComponentFixture<EmployeeDetailsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});