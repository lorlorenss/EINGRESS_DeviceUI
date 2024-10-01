import { Component, OnInit } from '@angular/core';
import { Employee } from '../interface/employee';
import { EmployeeService } from '../services/employee.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})

export class AfterLoginComponent implements OnInit {
  data: Employee | null = null;
  greeting: string = '';
  baseUrl = this.employeeService.apiUrl;
  currentTime: Date = new Date();

  constructor(
    private employeeService: EmployeeService,
    private timeService: TimeService
  ){}

  ngOnInit(): void {
    this.employeeService.employee$.subscribe((employee: Employee | null) => {
      this.data = employee;
    });

    this.updateCurrentTime();
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000); // Update every second
  }

  updateCurrentTime(): void {
    this.currentTime = this.timeService.getCurrentTime();
    this.setGreeting();
  }

  setGreeting(): void {
    const hours = this.currentTime.getHours();
    if (hours < 12) {
      this.greeting = 'Good Morning!';
    } else if (hours < 18) {
      this.greeting = 'Good Afternoon!';
    } else {
      this.greeting = 'Good Evening!';
    }
  }
}
