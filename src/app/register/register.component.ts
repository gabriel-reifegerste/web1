import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Employee } from '../model/Employee';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isUpdate: boolean = false;
  id = new FormControl('');
  nome = new FormControl('');
  salario = new FormControl('');
  idade = new FormControl('');
  url = new FormControl('');
  snackconfig = new MatSnackBarConfig();

  constructor(private snackBar: MatSnackBar, private service: HttpService, private route: ActivatedRoute) {
    this.snackconfig.duration = 4000;
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.isUpdate = data.isUpdate;
      if(this.isUpdate) {
        this.disableFields();
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', this.snackconfig);
  }

  disableFields() {
    this.nome.disable();
    this.idade.disable();
    this.salario.disable();
    this.url.disable();
  }

  getEmployeeById() {
    if(this.id.value) {
      const employee = this.service.getEmployeeByIdFromLocal(this.id.value);
      if(employee) {
        this.nome.setValue(employee.employee_name);
        this.idade.setValue(employee.employee_age);
        this.url.setValue(employee.profile_image);
        this.salario.setValue(employee.employee_salary);
        this.enableFields();
      }
    }
  }

  enableFields() {
    this.nome.enable();
    this.idade.enable();
    this.salario.enable();
    this.url.enable();
  }

  saveEmployee() {
    const employee = new Employee(this.nome.value, this.salario.value, this.idade.value);
    if(this.isUpdate) {
      employee.id = this.id.value;
    }
    const success = this.service.persistEmployeeInLocal(employee);
    if (success) {
      this.openSnackBar("Registro salvo com sucesso");
      this.id.reset();
      this.nome.reset();
      this.idade.reset();
      this.salario.reset();
    } else {
      this.openSnackBar("Ocorreu um erro inesperado ao salvar.");
    }
  }  

}
