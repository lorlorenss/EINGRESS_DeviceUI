import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-not-admin',
  templateUrl: './not-admin.component.html',
  styleUrls: ['./not-admin.component.css']
})
export class NotAdminComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  instruction: string = '';
  rfidInput: string = '';
  currentTime: Date = new Date();
  greeting: string = '';

  constructor(
    private employeeService: EmployeeService, 
    private router: Router,
    private timeService: TimeService
  ) {
    // Focus on the input textbox when the component is initialized
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  @HostListener('document:click', ['$event'])

  onClick(event: MouseEvent) {
    // Focus on the input textbox whenever a click event occurs on the document
    this.inputElement.nativeElement.focus();

    // Prevent the default behavior of the click event to ensure the input textbox remains focused
    event.preventDefault();
  }


  onFocus(): void {
    this.isHidden = false;
  }

  ngOnInit(): void {
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
  
  submitData(): void {
      this.rfidInput = this.inputElement.nativeElement.value;
      const shutdownRfid = this.employeeService.specialRFID[0].shutdown;
      const emergencyText = this.employeeService.emergencyText;
  
      if (this.rfidInput.trim() !== '') {
        if (this.rfidInput.trim() === shutdownRfid) {
          console.log('Shutdown initiated');
          setTimeout(() => {
            this.router.navigateByUrl('shutdown');
          });
        }
        else if (this.rfidInput == emergencyText) {
          this.router.navigateByUrl('emergency');
          setTimeout(() => {
            this.router.navigateByUrl('landingPage');
          }, 10000); 
        }
       
      this.inputElement.nativeElement.value = '';
      this.inputElement.nativeElement.focus();
    }
  
    }
}

