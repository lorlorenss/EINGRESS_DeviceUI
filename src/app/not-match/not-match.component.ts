import { Component, ElementRef, ViewChild, HostListener, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-match',
  templateUrl: './not-match.component.html',
  styleUrls: ['./not-match.component.css']
})
export class NotMatchComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  rfidInput: string = '';

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


  onFocus(): void {
    this.isHidden = false;
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
