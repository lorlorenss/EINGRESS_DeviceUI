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
  greetings: string = '';

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.employeeService.employee$.subscribe((employee: Employee | null) => {
      this.data = employee;
    })
    this.setGreeting();
  }

  setGreeting(){
    const currentTime = new Date().getHours();
    if(currentTime < 12){
      this.greetings = 'Good Morning';
    }
    else if (currentTime < 18){
      this.greetings = 'Good Afternoon';
    }
    else{
      this.greetings = 'Good Evening';
    }
  }
}
