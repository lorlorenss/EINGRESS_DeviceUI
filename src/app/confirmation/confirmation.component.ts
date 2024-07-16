import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';

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

  
  ngOnInit() {
    this.getRfid(); // Retrieve RFID when component initializes
  }
 
  getRfid(){
  this.rfid=  this.employeeService.getRfid();
  console.log('Stored RFID:', this.rfid); 
  }

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
  this.fingerInput = this.inputElement.nativeElement.value;
  console.log("RFID:", this.rfid);
  console.log("Finger Print:", this.fingerInput);

  if (this.fingerInput.trim() !== '') {
    if (this.fingerInput.trim() === '123') {
      // Special case: Navigate to 'Shutdown' after 3 seconds
      console.log('Shutdown initiated');
      setTimeout(() => {
        this.router.navigateByUrl('shutdown');
      });
    } 
    else if (this.fingerInput.trim() === 'Timeout'){
      this.router.navigateByUrl('timeout');
      setTimeout(() => {
        this.router.navigateByUrl('landingPage');
      }, 5000); 
    }
    else {
      // Default case: Perform normal login process
    
      this.employeeService.confirmEmployee(this.rfid, this.fingerInput).subscribe({
        next: (response: any) => {
          this.router.navigateByUrl('afterLoginPage');
          this.employeeService.setEmployee(response);
          setTimeout(() => {
            this.router.navigateByUrl('landingPage');
          }, 10000); // Return to landing page after 10 seconds
        },
        error: (error: any) => {
          this.router.navigateByUrl('notMatch');
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
