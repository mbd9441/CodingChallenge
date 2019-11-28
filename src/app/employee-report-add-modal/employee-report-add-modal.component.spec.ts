import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReportAddModalComponent } from './employee-report-add-modal.component';

describe('EmployeeReportAddModalComponent', () => {
  let component: EmployeeReportAddModalComponent;
  let fixture: ComponentFixture<EmployeeReportAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeReportAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeReportAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
