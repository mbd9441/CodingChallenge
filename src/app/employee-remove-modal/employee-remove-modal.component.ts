import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-remove-modal',
  templateUrl: './employee-remove-modal.component.html',
  styleUrls: ['./employee-remove-modal.component.css']
})
export class EmployeeRemoveModalComponent implements OnInit {
  private employee: Employee;
  private fromEmployee: Employee;
  
  ngOnInit(): void {
    this.employee=this.data.employee;
  }

  constructor(
    public dialogRef: MatDialogRef<EmployeeRemoveModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (!!data){
        this.employee=data[0];
        console.log("anus");
        if (data[1]){
          this.fromEmployee=data[1];
          console.log("Remove gdcgf" + this.employee.id + " from " + this.fromEmployee.id);
        }
      }
    }
  
  onCancelClick(): void {
    this.dialogRef.close();
  }

}