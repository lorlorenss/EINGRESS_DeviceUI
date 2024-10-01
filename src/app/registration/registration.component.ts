import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  instruction: string = 'Wait for instructions';
  currentTime: Date = new Date();
  greeting: string = '';

  constructor(private router: Router, private timeService: TimeService) {
    // Focus on the input textbox when the component is initialized
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    });

    if (this.instruction.includes('Wait for instructions')) {
      setTimeout(() => {
        this.router.navigateByUrl('instruction');
      }, 1000);
    }
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
    this.instruction = this.inputElement.nativeElement.value;

    this.inputElement.nativeElement.value = '';
    this.inputElement.nativeElement.focus();
  }
}
