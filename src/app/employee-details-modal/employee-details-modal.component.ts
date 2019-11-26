import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-details-modal.component.html',
  styleUrls: ['./employee-details-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  private mode: String;
  private employee: Employee;
  private fromEmployee: Employee;
  ngOnInit(): void {
    
  }

  constructor(
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee[]) {
      if (data.length>0){
        this.employee=data[0];
        if (data.length==1){
          this.mode="Edit";
          console.log(this.mode + " " + this.employee);
        } else {
          this.mode="Delete";
          this.fromEmployee=data[1];
          console.log(this.mode + " " + this.employee.id + " from " + this.fromEmployee.id);
        }
      }
    }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
