import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-remove-modal',
  templateUrl: './employee-remove-modal.component.html'
})
export class EmployeeRemoveModalComponent implements OnInit {
  private employee: Employee;
  private fromEmployee: Employee;
  
  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<EmployeeRemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (!!data){
        this.employee=data.employees[0];
        if (!!data.employees[1]){
          this.fromEmployee=data.employees[1];
        }
      }
    }
  
  onConfirmClick(): void {
    this.dialogRef.close([this.employee, this.fromEmployee]);
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

}