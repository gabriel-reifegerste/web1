export class Employee {
    id: number | undefined;
    employee_name: string;
    employee_salary: number;
    employee_age: number;

    constructor(employee_name: string, employee_salary: number, employee_age: number) {
      this.employee_name = employee_name;
      this.employee_salary = employee_salary;
      this.employee_age = employee_age;
    }
  }  