import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {catchError, map, reduce} from 'rxjs/operators';

import {Employee, create} from '../employee';
import {EmployeeService} from '../employee.service';
import { MatDialog } from '@angular/material';
import {EmployeeDetailsModalComponent} from '../employee-details-modal/employee-details-modal.component'
import {EmployeeRemoveModalComponent} from '../employee-remove-modal/employee-remove-modal.component';

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
  constructor(private employeeService: EmployeeService, public EmployeeDetailsModal:MatDialog, public EmployeeRemoveModal:MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
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
    console.log("Remove " + removeEmp[0].id + " from " + removeEmp[1]);
    if(!!removeEmp[1]){
      console.log("sorta bye bye")
    } else {
      console.log("uh oh! bye bye");
    }
    this.openRemoveDialog(removeEmp);
  }

  openRemoveDialog(employee: Employee[]): void {
    const EmployeeRemoveModal = this.EmployeeRemoveModal.open(EmployeeRemoveModalComponent, {
      width: '250px',
      data: { reload: (  ) => this.loadEmployees(), employee }
    });

    EmployeeRemoveModal.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.removeEmployee = result;
      console.log(result);
      if (!!result){
        console.log("erhswdhstdh" + result);
        if (!!result[1]){
          console.log("fuck")
        } else {
          console.log("shit" + this.removeEmployee[0])
          this.removeReportsAll(this.removeEmployee[0]);
          this.employeeService.remove(this.removeEmployee[0]).subscribe(
            result=>{
              this.loadEmployees();
            }
          );
          console.log(this.employees);
        }
      }
    });
  }

  removeReportsAll(emp:Employee){
    //var emps:number = 0;
    for(var i=0; i<this.employees.length; i++){
        console.log(this.employees[i])
        if (!!this.employees[i].directReports){
          for(var j=0; j<this.employees[i].directReports.length; j++){
            console.log(this.employees[i].directReports[j]);
            if(this.employees[i].directReports[j]==emp.id){
              this.employees[i].directReports.splice(j,1);
              this.employeeService.save(this.employees[i]).subscribe(
                result=>{}
              )
            }
          }
        }
    }
  }

  performEdit(editEmp: Employee){
    console.log("edit: " + editEmp.id);
    this.openEditDialog(editEmp);
  }

  openEditDialog(employee: Employee): void {
    const EmployeeDetailsModal = this.EmployeeDetailsModal.open(EmployeeDetailsModalComponent, {
      width: '250px',
      data: employee
    });

    EmployeeDetailsModal.afterClosed().subscribe(result => {
      this.editEmployee = result;
      console.log(result);
      if (!!result){
        console.log("poop" + employee + this.editEmployee);
        if (employee !== this.editEmployee){
          console.log("Edited");
        }
      }
    });
  }

  performAdd(addEmp: Employee[]){
    var newEmp: Employee = create();
    if (!!addEmp){
      if (addEmp[1]){
        console.log("add new employee to: " + addEmp[1].id);
      }
    }else{
      console.log("add employee");
    }
    this.openEditDialog(newEmp);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
