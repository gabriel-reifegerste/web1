import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Employee } from './model/Employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://dummy.restapiexample.com/api/v1";
  storage;
  maxIdInUse: number = 0;

  constructor(private http: HttpClient) {
    this.storage = window.localStorage;
  }

  removeEmployeeFromLocal(id: number) : boolean {
    if(this.storage.getItem(id.toString())){
      this.storage.removeItem(id.toString());
      this.http.delete(`${this.baseUrl}/delete/${id}`).subscribe();
      return true;
    }
    return false;
  }

  getEmployeeByIdFromLocal(id: number) {
    return JSON.parse(this.storage.getItem(id.toString()) || '');
  }

  getAllEmployeesFromStorage(): any[] {
    let employees = [];
    for(var i = 0; i < this.storage.length; i++) {
      const employeeString = this.storage.getItem(this.storage.key(i)?.toString() || '');
      const employeeObj = JSON.parse(employeeString || '') || null;
      let employee = new Employee(employeeObj.employee_name, employeeObj.employee_salary, employeeObj.employee_age);
      employee.id = employeeObj.id;
      if(employee && employee.employee_name && (employee instanceof Employee)) {
        employees.push(employee);
      }
    }
    return employees.sort(this.compare);
  }

  getInitialData() {
    return this.http.get<any>(`${this.baseUrl}/employees`)
    .pipe(
      retry(9),                     // retry a failed request up to 9 times
      catchError(() => of([])) // then handle the error
    );
  }

  compare( a: any, b: any ) {
    if ( a.id < b.id ){
      return -1;
    }
    if ( a.id > b.id ){
      return 1;
    }
    return 0;
  }

  getMaxIdInUse() : number {
    const employees = this.getAllEmployeesFromStorage();
    let max = 0;
    employees.forEach(employee => {
      max = employee.id > max ? employee.id : max;
    })
    return max;
  }

  persistEmployeeInLocal(employee: Employee): boolean {
    if(employee) {
      employee.id = employee.id || ++this.maxIdInUse;
      this.persistEmployee(employee);
      this.storage.setItem(employee.id.toString(), JSON.stringify(employee));
      return true;
    }
    return false;
  }

  persistEmployee(employee: Employee): boolean {
    if(employee) {
      if(!this.storage.getItem(employee.id?.toString() || '')) {
        this.http.post(`${this.baseUrl}/create`, {"name":employee.employee_name,"salary":employee.employee_salary,"age":employee.employee_age}).subscribe();
      } else {
        this.http.put(`${this.baseUrl}/update/${employee.id}`, {"name":employee.employee_name,"salary":employee.employee_salary,"age":employee.employee_age}).subscribe();
      }
      return true;
    }
    return false;
  }

  persistEmployeesInLocal(employees: any) {
    let storage = this.storage;
    Object.keys(employees).forEach(function(key) {
      if(typeof employees != typeof {}) {
        throw Error("Dado a persistir não é do tipo JSON");
      }
      const employeeObj = JSON.stringify(employees[key]);
        storage.setItem(employees[key]['id'], employeeObj);
      });
  }

  persistInitialDataOnLocal() {
    if(this.storage.getItem('isAlreadyFilled')) {
      this.maxIdInUse = this.getMaxIdInUse();
      return;
    }
    this.getInitialData().subscribe(response => {
      this.persistEmployeesInLocal(response.data);
      this.maxIdInUse = this.getMaxIdInUse();
      this.storage.setItem('isAlreadyFilled', "true");
    })
  }

  
}
