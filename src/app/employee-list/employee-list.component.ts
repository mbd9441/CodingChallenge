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
    console.log("load")
    this.employeeService.getAll()
      .pipe(
        reduce((emps, e: Employee) => emps.concat(e), []),
        map(emps => this.employees = emps),
        catchError(this.handleError.bind(this))
      ).subscribe();
  }

  performRemove(removeEmp: Employee[]){
    console.log("Remove " + removeEmp[0].id + " from " + removeEmp[1]);
    this.openRemoveDialog(removeEmp);
  }

  openRemoveDialog(employees: Employee[]): void {
    const EmployeeRemoveModal = this.EmployeeRemoveModal.open(EmployeeRemoveModalComponent, {
      width: '250px',
      data: { reload: (  ) => this.loadEmployees(), employees }
    });

    EmployeeRemoveModal.afterClosed().subscribe(result => {
      this.removeEmployee=result;
      console.log("ass")
      console.log(result)
      if (!!this.removeEmployee){
        if (!!this.removeEmployee[1]){
          console.log("remove report " +  this.removeEmployee[0] +"from " + this.removeEmployee[1]);
          this.removeReport(this.removeEmployee[0], this.removeEmployee[1])
        } else {
          this.removeReportsAll(this.removeEmployee[0]);
        }
        this.employeeService.remove(this.removeEmployee[0]).subscribe(
          result=>{
            this.loadEmployees();
          }
        );
      }
    });
  }

  removeReportsAll(emp:Employee){
    for(var i=0; i<this.employees.length; i++){
      console.log(this.employees[i])
      if (!!this.employees[i].directReports){
        for(var j=0; j<this.employees[i].directReports.length; j++){
          console.log(this.employees[i].directReports[j]);
          if(this.employees[i].directReports[j]==emp.id){
            console.log("remove " + emp.id + " from " + this.employees[i].id)
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
      console.log(fromEmp.directReports[i]);
      if(fromEmp.directReports[i]==emp.id){
        console.log("remove " + emp.id + " from " + fromEmp.id)
        fromEmp.directReports.splice(i,1);
        this.employeeService.save(fromEmp).subscribe(
          result=>{}
        )
        break
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
      if (!!result){
        console.log("edit" + employee + this.editEmployee);
        this.employeeService.save(result).subscribe(
          result=>{
            this.loadEmployees();
          }
        )
      }
    });
  }

  performAdd(addEmp: Employee[]){
    var newEmp: Employee = create();
    if (!!addEmp){
      if (addEmp[1]){
        console.log("add report to: " + addEmp[1].id);
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
