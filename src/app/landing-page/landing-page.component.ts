import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';

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
          this.router.navigateByUrl('confirmation');
          this.employeeService.setEmployee(response);
          
        },
        error: (error: any) => {
          this.router.navigateByUrl('errorPage');
          console.error('Error logging employee access:', error);
          if (error.status === 400 && error.error && error.error.message === 'Employee not found') {
            console.error('Employee not found.');
          } else {
            console.error('An error occurred while logging employee access.');
          }
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
