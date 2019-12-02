import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details-modal',
  templateUrl: './employee-details-modal.component.html'
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
      }
    }
  
  checkFields(): void {
    var canClose=true;
    for (var field in this.employee){
      if (!this.employee[field]){
        canClose=false;
      } else if (this.employee.compensation){
        var compstring: string = this.employee.compensation.toString();
        console.log("poop" + compstring);
        if (compstring.match(/^[0-9]+$/)){
          this.employee.compensation = Number(this.employee.compensation);
        } else {
          canClose=false;
        } 
      }
    }
    if (canClose) {
      this.dialogRef.close(this.employee);
    }
  }

  onCancelClick(): void {
    if (!this.employee.compensation){
      this.employee.compensation = 0;
    }
    this.dialogRef.close();
  }

}
