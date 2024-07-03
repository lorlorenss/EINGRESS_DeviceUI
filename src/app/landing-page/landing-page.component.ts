import { Component, ElementRef, ViewChild, HostListener, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  rfidInput: string = '';
  employee: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {
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

onFocus(): void{
  this.isHidden = false;
}

// onBlur(): void{
// setTimeout(() => {
//   this.isHidden = false;
// })
// }


submitData(): void {
  // Perform data submission logic here
  this.rfidInput = this.inputElement.nativeElement.value;

  if (this.rfidInput.trim() !== '') {
    if (this.rfidInput.trim() === '123') {
      // Special case: Navigate to 'Shutdown' after 3 seconds
      console.log('Shutdown initiated');
      setTimeout(() => {
        this.router.navigateByUrl('shutdown');
      });
    } else {
      // Default case: Perform normal login process
      this.employeeService.verifyRfid(this.rfidInput).subscribe({
        next: (response: any) => {
          console.log('RFID verified:', response);
          // Handle successful response
          this.router.navigateByUrl('confirmation');
          // Example: Set employee data in a service for later use
          this.employeeService.setEmployee(response);
          this.employeeService.setRfid(this.rfidInput);
          setTimeout(() => {
            this.router.navigateByUrl('landingPage');
          }, 10000); // 10 seconds delay
        },
        error: (errorMessage: string) => {
          console.error('Error logging employee access:', errorMessage);
  
          // Check error conditions and route accordingly
          if (errorMessage === 'Employee not found.') {
            this.router.navigateByUrl('errorPage');
            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 3000); // 30 seconds delay
          } else if (errorMessage === 'Employee has no fingerprint.') {
            this.router.navigateByUrl('verification');
            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 30000); // 30 seconds delay
          } else {
            this.router.navigateByUrl('errorPage'); // Default error page for other cases
            setTimeout(() => {
              this.router.navigateByUrl('landingPage');
            }, 3000); // 30 seconds delay
          }
  
          // Return to landing page after 3 seconds
          // setTimeout(() => {
          //   this.router.navigateByUrl('landingPage');
          // }, 3000); // Return to landing page after 3 seconds
        }
      });
    }
  }

  this.inputElement.nativeElement.value = '';
  this.inputElement.nativeElement.focus();

}


}
