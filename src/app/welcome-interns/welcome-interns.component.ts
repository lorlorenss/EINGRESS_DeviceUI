import { Component, ElementRef, ViewChild, HostListener, Output } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-interns',
  templateUrl: './welcome-interns.component.html',
  styleUrls: ['./welcome-interns.component.css']
})
export class WelcomeInternsComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  instruction: string = '';
  rfidInput: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) {
    // Focus on the input textbox when the component is initialized
  }
  selectedSchool: string | undefined;
  rfidNumber= this.employeeService.rfidNumber;

  ngOnInit(){
    this.selectedSchool = this.employeeService.findSchoolByRFID(this.rfidNumber, this.employeeService.ojtAccess)
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
    // Perform data submission logic here

    if (this.instruction.includes('Fingerprint ID:')){
      this.instruction = this.inputElement.nativeElement.value;
      if (this.instruction.includes('Success')){
        this.instruction = "Fingerprint Successfully deleted on the sensor"
        setTimeout(() => {
          this.router.navigateByUrl('landingPage');
        },3000);
    }
    else if (this.instruction.includes('Failed')){
      this.instruction = "Fingerprint already deleted in sensor"
      setTimeout(() => {
        this.router.navigateByUrl('landingPage');
      },3000);
  }
    }
    else{
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
}
  

