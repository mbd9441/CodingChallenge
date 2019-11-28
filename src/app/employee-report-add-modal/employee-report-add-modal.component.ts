import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-report-add-modal',
  templateUrl: './employee-report-add-modal.component.html',
  styleUrls: ['./employee-report-add-modal.component.css']
})
export class EmployeeReportAddModalComponent implements OnInit {
  private employee: Employee;
  private potentialEmps: Employee[];
  selectedEmployee: Employee;

  constructor(
    public dialogRef: MatDialogRef<EmployeeReportAddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data){
        this.employee = data[0];
        this.potentialEmps = data[1].slice();
        for (var i = 0; i < this.potentialEmps.length; i++){
          if (this.potentialEmps[i].id==this.employee.id){
            this.potentialEmps.splice(i,1);
            break
          }
        }
        if (!!this.employee.directReports){
          for (var i = 0; i < this.employee.directReports.length; i++){
            for (var j = 0; j < this.potentialEmps.length; j++){
              if (this.potentialEmps[j].id==this.potentialEmps[i].id){
                this.potentialEmps.splice(i,1);
                break
              }
            }
          }
        }
        console.log(this.employee)
        console.log(this.potentialEmps)
      }
    }

  ngOnInit() {
  }

  onConfirmClick(): void {
    if (!this.employee.directReports){
      this.employee.directReports=[];
    }
    this.employee.directReports.push(this.selectedEmployee.id)
    this.dialogRef.close(this.employee);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
