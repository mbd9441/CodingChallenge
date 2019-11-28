import {Component, Input, Output, EventEmitter, } from '@angular/core';
import {catchError, reduce} from 'rxjs/operators';

import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {
  @Input() employee: Employee;
  @Output() edit = new EventEmitter<Employee>();
  @Output() remove = new EventEmitter<Employee[]>();
  @Output() add = new EventEmitter<Employee[]>();
  errorMessage: string;
  private Compensation: number = 0;
  private reports: Employee[]=[];
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
        for (var emp in emps){
          var curemp=emps[emp];
          if (curemp.id == curempid){
            if (!!curemp.directReports){
              //console.log(curemp.id);
              this.employee["numDirectReports"] = emps[emp].directReports.length;
              this.recurEmps(emps, curempid);
            } else {
              this.employee["numDirectReports"] = 0;
            }
          }
        }
        console.log(this.reports);        
        this.employee["totalReports"]=this.reports.length;
      }
    );
  }

  recurEmps(emps: any, curempid: number) {
    var curemp = emps[curempid-1];
    if (!!curemp.directReports){
      for (var rprts in curemp.directReports){
        for (var emp in emps){
          if (emps[emp].id==curemp.directReports[rprts]){
            this.reports.push(emps[emp]);
            if (!!emps[emp].directReports){
              this.recurEmps(emps, emps[emp].id)
            }
            break
          }
        }
      }
    }
  }

  addClick(event:Event, thisEmp: Employee, parentEmp:Employee){
    this.add.emit([thisEmp, parentEmp]);
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
    console.log('been here '+curempid)
    this.employeeService.get(curempid).subscribe(
      (emp)=>{
        currentEmployee = emp;
        if (!!currentEmployee.directReports){
          console.log('direct reports ' + currentEmployee.id + ' ' + currentEmployee.directReports);
          for (var emps in currentEmployee.directReports){
            console.log('current report: ' + currentEmployee.directReports[emps]);
            if (!priorIter.includes(currentEmployee.directReports[emps])){
              let promise = this.getAllReports(currentEmployee.directReports[emps],origempid, reports, priorIter);
              var resultArray = promise.then(result=>resultArray=result);
              reports = resultArray[0];
              priorIter = resultArray[1];
              console.log('is ' + curempid + ' ' + origempid);
              if (curempid!=origempid){
                reports.push(currentEmployee);
                console.log(JSON.stringify(reports)');
              }
            }
          }
        }
      }
    );
    return Promise.resolve([reports, priorIter]);
  }**/