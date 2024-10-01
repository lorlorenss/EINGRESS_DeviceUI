import { Component, ElementRef, ViewChild, HostListener, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  @ViewChild('inputElement1', { static: true }) inputElement1!: ElementRef;
  isHidden: boolean = false;
  instruction: string = 'Tap RFID of User';
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
      const adminRfid = this.employeeService.specialRFID[0].admin;
      const shutdownRfid = this.employeeService.specialRFID[0].shutdown;
      const emergencyText = this.employeeService.emergencyText;
  
      if (this.rfidInput.trim() !== '') {
        if (this.rfidInput.trim() === shutdownRfid) {
          // Special case: Navigate to 'Shutdown' after 3 seconds
          console.log('Shutdown initiated');
          setTimeout(() => {
            this.router.navigateByUrl('shutdown');
          });
        }
        else if(this.rfidInput.trim() === emergencyText) {
          this.router.navigateByUrl('emergency');
          setTimeout(() => {
            this.router.navigateByUrl('landingPage');
          }, 10000); 
        }
        else {
          // Default case: Perform normal login process
          this.employeeService.verifyRfid(this.rfidInput).subscribe({
            next: (response: any) => {
              console.log('RFID verified:', response);
              this.instruction = "Fingerprint ID: " + this.employeeService.fingerprintUI

            },
            error: (errorMessage: string) => {
              console.error('Error logging employee access:', errorMessage);
  
              if (errorMessage === 'Employee not found.') {
                this.router.navigateByUrl('errorPage');
                setTimeout(() => {
                  this.router.navigateByUrl('landingPage');
                }, 3000); // 30 seconds delay
              } else {
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
