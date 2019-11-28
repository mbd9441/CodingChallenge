export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  compensation: number;
  directReports?: Array<number>;
}
export function create(id?: number, firstName?: string, lastName?: string, position?: string, compensation?: number, directReports?: Array<number>): Employee {
   return {
     id,
     firstName,
     lastName,
     position,
     compensation,
     directReports
   }
 }