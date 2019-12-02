import { CloneVisitor } from "@angular/compiler/src/i18n/i18n_ast";

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  compensation: number;
  directReports?: Array<number>;

  constructor(id?: number, firstName?: string, lastName?: string, position?: string, compensation?: number, directReports?: Array<number>){
    return {
      id,
      firstName,
      lastName,
      position,
      compensation,
      directReports
    }
  }
}