import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  OnInit,
} from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-shutdown-page',
  templateUrl: './shutdown.component.html',
  styleUrls: ['./shutdown.component.css'],
})
export class ShutdownComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  rfidInput: string = '';
  employee: Employee[] = [];
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
  // onInput(event: Event): void {
  //   // Log the typed input to the console
  //   console.log('Typed input:', (event.target as HTMLInputElement).value);
  // }

  onFocus(): void {
    this.isHidden = false;
  }

  // onBlur(): void{
  // setTimeout(() => {
  //   this.isHidden = false;
  // })
  // }

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

    if (this.rfidInput.trim() !== '') {
      if (this.rfidInput.trim() === '123') {
        // Special case: Navigate to 'Shutdown' after 3 seconds
        console.log('Shutdown initiated');
        setTimeout(() => {
          this.router.navigateByUrl('landingPage');
        });
      } else {
        // Default case: Perform normal login process
        this.employeeService.verifyRfid(this.rfidInput).subscribe({
          next: (response: any) => {
            this.router.navigateByUrl('afterLoginPage');
            this.employeeService.setEmployee(response);
            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 10000); // Return to landing page after 10 seconds
          },
          error: (error: any) => {
            this.router.navigateByUrl('errorPage');
            console.error('Error logging employee access:', error);
            if (
              error.status === 400 &&
              error.error &&
              error.error.message === 'Employee not found'
            ) {
              console.error('Employee not found.');
            } else {
              console.error('An error occurred while logging employee access.');
            }
            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 3000); // Return to landing page after 3 seconds
          },
        });
      }
    }

    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.focus();
  }
}
