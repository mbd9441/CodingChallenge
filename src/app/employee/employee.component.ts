import {Component, Input, Output, EventEmitter, } from '@angular/core';
import {catchError, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html'
})

export class EmployeeComponent {
  @Input() employee: Employee;
  @Output() edit = new EventEmitter<Employee>();
  @Output() remove = new EventEmitter<Employee[]>();
  @Output() addreport = new EventEmitter<Employee>();
  errorMessage: string;
  private employees: any = [];
  private reports: Employee[]=[];
  private compensation: number;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getReports(this.employee.id);
  }

  getReports(curempid: number){
    this.employeeService.getAll()
    .pipe(
      reduce((emps, e: Employee) => emps.concat(e), []),
      catchError(this.handleError.bind(this))
    ).subscribe(
      (emps)=>{
        this.employees=emps;
        for (var emp in emps){
          var curemp=emps[emp];
          if (curemp.id == curempid){
            if (!!curemp.directReports){
              if (curemp.directReports.length>0){
                this.employee["numDirectReports"] = emps[emp].directReports.length;
                this.recurEmps(curemp);
              } else {
                this.employee["numDirectReports"] = 0;
              }
            } else {
              this.employee["numDirectReports"] = 0;
            }
          }
        }
        if (!this.employee.compensation){
          this.employee.compensation=0;
        }
        this.employee["totalReports"]=this.reports.length;
      }
    );
  }

  recurEmps(curemp: Employee) {
    if (!!curemp.directReports){
      for (var rprts in curemp.directReports){
        for (var emp in this.employees){
          if (this.employees[emp].id==curemp.directReports[rprts]){
            if(!this.reports.includes(this.employees[emp]) && this.employees[emp].id!=this.employee.id){
              if (curemp.id == this.employee.id){
                if (this.employee.directReports.includes(this.employees[emp].id)){
                  this.reports.push(this.employees[emp]);
                }
              } else {
                if (!this.employee.directReports.includes(this.employees[emp].id)){
                  this.reports.push(this.employees[emp]);
                }
              }
              if (!!this.employees[emp].directReports){
                this.recurEmps(this.employees[emp])
              }
            }
            break
          }
        }
      }
    }
  }

  addReportClick(event:Event, parentEmp:Employee){
    this.addreport.emit(parentEmp);
  }

  editClick(event:Event, thisEmp: Employee){
    this.edit.emit(thisEmp);
  }

  removeClick(event:Event, thisEmp: Employee, parentEmp:Employee){
    this.remove.emit([thisEmp,parentEmp]);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}

  /**async getAllReports(curempid: number, origempid: number, reports: Employee[], priorIter: number[]): Promise<[Employee[], number[]]>{
    var currentEmployee: Employee;
    priorIter.push(curempid);
    this.employeeService.get(curempid).subscribe(
      (emp)=>{
        currentEmployee = emp;
        if (!!currentEmployee.directReports){
          for (var emps in currentEmployee.directReports){
             if (!priorIter.includes(currentEmployee.directReports[emps])){
              let promise = this.getAllReports(currentEmployee.directReports[emps],origempid, reports, priorIter);
              var resultArray = promise.then(result=>resultArray=result);
              reports = resultArray[0];
              priorIter = resultArray[1];
              if (curempid!=origempid){
                reports.push(currentEmployee);
              }
            }
          }
        }
      }
    );
    return Promise.resolve([reports, priorIter]);
  }**/