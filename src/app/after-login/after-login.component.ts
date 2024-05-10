import { Component, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';


@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {
  data: Employee | null = null;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.employeeService.employee$.subscribe((employee: Employee | null) => {
      this.data = employee;
    })
  }
}
