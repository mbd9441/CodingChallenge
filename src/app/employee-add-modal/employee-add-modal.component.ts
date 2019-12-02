import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-add-modal',
  templateUrl: './employee-add-modal.component.html'
})
export class EmployeeAddModalComponent implements OnInit {
  private employee: Employee;

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  constructor(
    public dialogRef: MatDialogRef<EmployeeAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
      if (data){
        this.employee=data;
      }
    }
  
  checkFields(): void {
    var canClose=true;
    if (!this.employee.firstName){
      canClose=false;
    }
    if (!this.employee.lastName){
      canClose=false;
    }
    if (!this.employee.position){
      canClose=false;
    }
    if (this.employee.compensation){
      var compstring: string = this.employee.compensation.toString();
      if (compstring.match(/^[0-9]+$/)){
        this.employee.compensation = Number(this.employee.compensation);
      } else {
        canClose=false;
      }
    } else {
      canClose=false;
    }
    if (canClose) {
      this.dialogRef.close(this.employee);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
