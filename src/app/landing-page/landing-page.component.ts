import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { ErrorLogService } from '../services/error-log.service'; // Import ErrorLogService
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit{
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  rfidInput: string = '';
  currentTime: Date = new Date();
  greeting: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private errorLogService: ErrorLogService, // Inject ErrorLogService
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
    // Perform data submission logic here
    this.rfidInput = this.inputElement.nativeElement.value;
    const adminRfid = this.employeeService.specialRFID[0].admin;
    const shutdownRfid = this.employeeService.specialRFID[0].shutdown;
    const emergencyText = this.employeeService.emergencyText;
    const rebootRFID = this.employeeService.specialRFID[0].rebooot;

    if (this.rfidInput.trim() !== '') {
      if (this.rfidInput.trim() === shutdownRfid) {
        // Special case: Navigate to 'Shutdown' after 3 seconds
        console.log('Shutdown initiated');
        setTimeout(() => {
          this.router.navigateByUrl('shutdown');
        });
      } 
      else if (this.rfidInput == rebootRFID) {
        this.router.navigateByUrl('reboot');
      }
      else if (this.rfidInput == adminRfid) {
        this.router.navigateByUrl('delete');
      }
      else if (this.rfidInput == emergencyText) {
        this.router.navigateByUrl('emergency');
        setTimeout(() => {
          this.router.navigateByUrl('landingPage');
        }, 15000); 
      }
      else {
        // Default case: Perform normal login process
        this.employeeService.verifyRfid(this.rfidInput).subscribe({
          next: (response: any) => {
            if( response.role !== "Intern" && response.role !== "Guest"){
              this.router.navigateByUrl('confirmation');
              this.employeeService.setEmployee(response);
              this.employeeService.setRfid(this.rfidInput);
            }
            else{
              console.log("Routing to welcome page")
              this.employeeService.setEmployee(response);
              this.router.navigateByUrl('afterLoginPage');
              setTimeout(() => {
                this.router.navigateByUrl('landingPage');
              }, 10000); // Return to landing page after 10 seconds
            }
          },
          error: (errorMessage: string) => {
            // Log the error message
            this.errorLogService.logError(errorMessage).subscribe({
              next: () => console.log('Error logged successfully.'),
              error: (err) => console.error('Failed to log error:', err),
            });
            console.log("Log Error function prompted: ", errorMessage);
            // Check error conditions and route accordingly
            if (errorMessage === 'Employee not found.') {
              this.router.navigateByUrl('errorPage');
              setTimeout(() => {
                this.router.navigateByUrl('landingPage');
              }, 3000); // 30 seconds delay
            } else if (errorMessage === 'Employee has no fingerprint.') {
              this.router.navigateByUrl('verification');
            }
            else {
              this.router.navigateByUrl('errorPage'); // Default error page for other cases
              setTimeout(() => {
                this.router.navigateByUrl('landingPage');
              }, 3000); //
            }
          }
        });
      }
    }
  
    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.focus();
  }
}
