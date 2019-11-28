import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable, throwError} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';

import {Employee} from './employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private url = 'api/';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Employee> {
    return this.http.get<Employee[]>(`${this.url}employees`)
      .pipe(
        flatMap(emps => from(emps)),
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}employees/${id}`)
      .pipe(catchError(this.handleError));
  }

  save(emp: Employee): Observable<Employee> {
    console.log(emp)
    const response = (!!emp.id) ? this.put(emp) : this.post(emp);
    return response.pipe(catchError(this.handleError));
  }

  remove(emp: Employee): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}employees/${emp.id}`)
      .pipe(catchError(this.handleError));
  }

  private post(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp);
  }

  private put(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}employees/${emp.id}`, emp);
  }

  private handleError(res: HttpErrorResponse | any): Observable<never> {
    return throwError(res.error || 'Server error');
  }
}
