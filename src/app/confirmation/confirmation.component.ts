import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';
import { ErrorLogService } from '../services/error-log.service';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  fingerInput: string = '';
  employee: Employee[] = [];
  rfid: string = '';
  currentTime: Date = new Date();
  greeting: string = '';
  scanningMessage: string = 'Hold to scan your fingerprint';
  isScanning: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private errorLogService: ErrorLogService,
    private timeService: TimeService
  ) {
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });
  }

  onScanStart(): void {
    this.isScanning = false;
    // Optional: Simulate a delay before performing further actions
    setTimeout(() => {
        // You can add logic here for after scanning, if needed
        this.isScanning = true; // Reset scanning state after the task is done
    }, 2000); // Keep the message for 3 seconds or adjust as necessary
  }

  ngOnInit() {
    this.getRfid(); // Retrieve RFID when component initializes
    this.updateCurrentTime();
    this.onScanStart();
    setInterval(() => {
      this.updateCurrentTime();
    }, 1000); // Update every second
  }

  getRfid() {
    this.rfid = this.employeeService.getRfid();
    console.log('Stored RFID:', this.rfid); 
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    this.inputElement.nativeElement.focus();
    event.preventDefault();
  }

  onFocus(): void {
    this.isHidden = false;
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
    this.fingerInput = this.inputElement.nativeElement.value;
    console.log("RFID:", this.rfid);
    console.log("Finger Print:", this.fingerInput);

    if (this.fingerInput.trim() !== '') {
      if (this.fingerInput.trim() === '123') {
        console.log('Shutdown initiated');
        setTimeout(() => {
          this.router.navigateByUrl('shutdown');
        }, 3000); // Added delay
      } 
      else if (this.fingerInput.trim() === 'Timeout') {
        this.router.navigateByUrl('timeout');
        setTimeout(() => {
          this.router.navigateByUrl('landingPage');
        }, 1500); 
      }
      else if (/^\d{10}$/.test(this.fingerInput)) {
        // Finger input has exactly 10 digits
        console.log("RFID is not valid as fingerprint input");
      }
      else {
        this.employeeService.confirmEmployee(this.fingerInput, this.rfid).subscribe({
          next: (response: any) => {
            this.router.navigateByUrl('afterLoginPage');
            this.employeeService.setEmployee(response);
            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 15000); // Return to landing page after 10 seconds
          },
          error: (error: any) => {
            this.router.navigateByUrl('notMatch');
            this.errorLogService.logError(error).subscribe({
              next: () => console.log('Error logged successfully.'),
              error: (err) => console.error('Failed to log error:', err),
            });
            console.log("Log Error function prompted: ", error);

            let errorType = '';
            if (error.status === 400 && error.error && error.error.message === 'Employee not found') {
              errorType = 'notFound';
              console.error('Employee not found.');
            } else {
              errorType = 'notMatch';
              console.error('An error occurred while logging employee access.');
            }

            // Log the error to the backend using the same EmployeeService
            this.employeeService.logError({
              errorType: errorType,
              message: error.message || 'An error occurred'
            }).subscribe({
              next: () => console.log('Error logged successfully'),
              error: (logError: any) => console.error('Failed to log error:', logError)
            });

            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 3000); // Return to landing page after 3 seconds
          }
        });
      }
    }

    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.focus();
  }
}
