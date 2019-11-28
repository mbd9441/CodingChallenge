import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee, create} from '../employee';
import {EmployeeService} from '../employee.service';
import { MatDialog } from '@angular/material';
import {EmployeeDetailsModalComponent} from '../employee-details-modal/employee-details-modal.component';
import {EmployeeRemoveModalComponent} from '../employee-remove-modal/employee-remove-modal.component';
import {EmployeeReportAddModalComponent} from '../employee-report-add-modal/employee-report-add-modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  errorMessage: string;
  editEmployee: Employee;
  removeEmployee: Employee[];
  constructor(private employeeService: EmployeeService, public EmployeeDetailsModal:MatDialog, 
    public EmployeeRemoveModal:MatDialog, public EmployeeReportAddModal: MatDialog) {
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  performRemove(removeEmp: Employee[]){
    this.openRemoveDialog(removeEmp);
  }

  openRemoveDialog(employees: Employee[]): void {
    const EmployeeRemoveModal = this.EmployeeRemoveModal.open(EmployeeRemoveModalComponent, {
      width: '250px',
      data: { reload: (  ) => this.loadEmployees(), employees }
    });

    EmployeeRemoveModal.afterClosed().subscribe(result => {
      this.removeEmployee=result;
      if (!!this.removeEmployee){
        if (!!this.removeEmployee[1]){
           this.removeReport(this.removeEmployee[0], this.removeEmployee[1]);
        } else {
          this.removeReportsAll(this.removeEmployee[0]);
          this.employeeService.remove(this.removeEmployee[0]).subscribe(
            result=>{
              this.loadEmployees();
            }
          );
        }
      }
    });
  }

  removeReportsAll(emp:Employee){
    for(var i=0; i<this.employees.length; i++){
      if (!!this.employees[i].directReports){
        for(var j=0; j<this.employees[i].directReports.length; j++){
          if(this.employees[i].directReports[j]==emp.id){
            this.employees[i].directReports.splice(j,1);
            this.employeeService.save(this.employees[i]).subscribe(
              result=>{}
            )
            break
          }
        }
      }
    }
  }

  removeReport(emp:Employee, fromEmp: Employee){
    for(var i=0; i<fromEmp.directReports.length; i++){
      if(fromEmp.directReports[i]==emp.id){
        fromEmp.directReports.splice(i,1);
        this.employeeService.save(fromEmp).subscribe(
          result=>{
            this.loadEmployees();
          }
        )
        break
      }
    }
  }

  performEdit(editEmp: Employee){
    this.openEditDialog(editEmp);
  }

  openEditDialog(employee: Employee): void {
    const EmployeeDetailsModal = this.EmployeeDetailsModal.open(EmployeeDetailsModalComponent, {
      width: '250px',
      data: employee
    });

    EmployeeDetailsModal.afterClosed().subscribe(result => {
      this.editEmployee = result;
      if (!!result){
        this.employeeService.save(result).subscribe(
          result=>{
            this.loadEmployees();
          }
        )
      }
    });
  }

  performAddReport(parentEmp: Employee){
    this.openAddReportDialog(parentEmp);
  }

  openAddReportDialog(parentEmp: Employee): void {
    console.log(parentEmp)
    const EmployeeReportAddModal = this.EmployeeReportAddModal.open(EmployeeReportAddModalComponent, {
      width: '250px',
      data: [parentEmp, this.employees]
    });

    EmployeeReportAddModal.afterClosed().subscribe(result => {
      if (!!result){
        console.log(result)
        this.employeeService.save(result).subscribe(
          result=>{
            this.loadEmployees();
          }
        )
      }
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
