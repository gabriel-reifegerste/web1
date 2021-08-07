import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';
import { Employee } from '../model/Employee';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  employees;

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(private service: HttpService) {
    this.employees = new MatTableDataSource<Employee>(this.service.getAllEmployeesFromStorage());
  }

  ngAfterViewInit() {
    this.employees.paginator = this.paginator || this.employees.paginator;
  }
}