import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  Output,
} from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { Employee } from '../interface/employee';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css'],
})
export class VerificationComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  rfidInput: string = '';
  employee: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
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

  submitData(): void {
    // Perform data submission logic here
    this.rfidInput = this.inputElement.nativeElement.value;

    if (this.rfidInput.trim() !== '') {
      if (this.rfidInput=== '123') {
        // Special case: Navigate to 'Shutdown' after 3 seconds
        console.log('Shutdown initiated');
        setTimeout(() => {
          this.router.navigateByUrl('shutdown');
        });
      } else if (this.rfidInput == '0909314995') {
        this.router.navigateByUrl('registration');
      }
      else{
        this.router.navigateByUrl('notAdmin');
        setTimeout(() => {
          this.router.navigateByUrl('landingPage');
        }, 3000); // Return to landing page after 3 seconds
      }
    }

    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.focus();
  }
}
