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
      } else if (this.employee.compensation){
        var compstring: string = this.employee.compensation.toString();
        if (!compstring.match(/^[0-9]+$/)){
          
          canClose=false;
        } else {
          this.employee.compensation = Number(this.employee.compensation);
        }
      }
    }
    if (canClose) {
      this.employee.compensation=this.employee.compensation
      this.dialogRef.close(this.employee);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
