import {Component, Input, Output, EventEmitter} from '@angular/core';
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
  @Output() edit = new EventEmitter<Employee[]>();
  @Output() delete = new EventEmitter<Employee[]>();
  errorMessage: string;
  private Compensation: number;
  private reports: Employee[]=[];
  constructor(private employeeService: EmployeeService) {
    
  }

  ngOnInit(): void {
    this.employee["numDirectReports"]=0;
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
              console.log(curemp.id);
              this.employee["numDirectReports"] = emps[emp].directReports.length;
              this.recurEmps(emps, curempid);
              break
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
        console.log('current ' + curemp.id + ' reports ' + curemp.directReports[rprts]);
        this.reports.push(emps[curemp.directReports[rprts]-1]);
        if (emps[curemp.directReports[rprts]-1].directReports){
          this.recurEmps(emps,emps[curemp.directReports[rprts]-1].id);
        }
      }
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

  editClick(event:Event, thisEmp: Employee, fromEmp:Employee){
    this.edit.emit([thisEmp,fromEmp]);
  }

  deleteClick(event:Event, thisEmp: Employee, fromEmp:Employee){
    this.edit.emit([thisEmp,fromEmp]);
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }
}
