import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-report-add-modal',
  templateUrl: './employee-report-add-modal.component.html'
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
        //remove this employee from potential reports
        //and all people who this person reports to
        for (var i = 0; i < this.potentialEmps.length; i++){
          if (this.potentialEmps[i].id==this.employee.id){
            this.potentialEmps.splice(i,1);
          } else if (!!this.potentialEmps[i].directReports){
            if (this.potentialEmps[i].directReports.includes(this.employee.id)){
              this.potentialEmps.splice(i,1);
              i--;
            }
          }
        }
        //remove current reports from potential reports
        if (!!this.employee.directReports){
          for (var emp in this.employee.directReports){
            for (var rep = 0; rep < this.potentialEmps.length; rep++){
              if (this.potentialEmps[rep].id==this.employee.directReports[emp]){
                this.potentialEmps.splice(rep,1);
                rep=rep-1;
                break
              }
            }
          }
        }
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
