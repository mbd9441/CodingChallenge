import {Component, OnInit} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';
import { MatDialog } from '@angular/material';
import {EmployeeModalComponent} from '../employee-modal/employee-modal.component'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  private employees: Employee[] = [];
  errorMessage: string;
  editEmployee: Employee[];
  constructor(private employeeService: EmployeeService, public EmployeeModal:MatDialog) {
  }

  ngOnInit(): void {
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  performEdit(editEmp: Employee){
    console.log("edit: " + editEmp.id);
    this.openDialog([editEmp]);
  }

  performDelete(deleteEmp: Employee[]){
    console.log("delete " + deleteEmp[0].id + " from " + deleteEmp[1].id);
    this.openDialog(deleteEmp);
  }

  openDialog(employee: Employee[]): void {
    const employeeModal = this.EmployeeModal.open(EmployeeModalComponent, {
      width: '250px',
      data: employee
    });

    employeeModal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.editEmployee = result;
      if (!!result){
        console.log(result);
      }
    });
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
