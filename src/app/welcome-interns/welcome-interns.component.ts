import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-welcome-interns',
  templateUrl: './welcome-interns.component.html',
  styleUrls: ['./welcome-interns.component.css']
})
export class WelcomeInternsComponent {
  constructor(private employeeService: EmployeeService, private router: Router) {
    // Focus on the input textbox when the component is initialized
  }
  selectedSchool: string | undefined;
  rfidNumber= this.employeeService.rfidNumber;

  ngOnInit(){
    this.selectedSchool = this.employeeService.findSchoolByRFID(this.rfidNumber, this.employeeService.ojtAccess)
  }

  
}
