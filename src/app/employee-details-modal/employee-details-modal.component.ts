import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details-modal',
  templateUrl: './employee-details-modal.component.html',
  styleUrls: ['./employee-details-modal.component.css']
})
export class EmployeeDetailsModalComponent implements OnInit {
  private employee: Employee;

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  constructor(
    public dialogRef: MatDialogRef<EmployeeDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
      if (data){
        this.employee=data;
        if(!this.employee.compensation){
          this.employee["compensation"]=null;
        }
        console.log("Edit " + this.employee);
      }
    }
  
  checkFields(): void {
    var canClose=true;
    for (var field in this.employee){
      console.log(this.employee[field]);
      if (!this.employee[field]){
        canClose=false;
        console.log(canClose);
      }
    }
    if (canClose) {
      this.dialogRef.close();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
