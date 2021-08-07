import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-removal',
  templateUrl: './removal.component.html',
  styleUrls: ['./removal.component.css']
})
export class RemovalComponent implements OnInit {

  id = new FormControl('');
  snackconfig = new MatSnackBarConfig();

  constructor(private snackBar: MatSnackBar, private service: HttpService) {
    this.snackconfig.duration = 4000;
  }

  ngOnInit(): void {
  }

  verifyAndRemove() {
    if(this.id.value) {
      const success = this.service.removeEmployeeFromLocal(this.id.value);
      if (success) {
        this.openSnackBar("Registro excluído com sucesso");
        this.id.reset();
      } else {
        this.openSnackBar("Registro não encontrado");
      }
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', this.snackconfig);
  }

}
