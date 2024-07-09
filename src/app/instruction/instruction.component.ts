import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef;
  isHidden: boolean = false;
  instruction: string = 'Instructions';

  constructor(private router: Router) {
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
  this.instruction = this.inputElement.nativeElement.value;

  if (this.instruction.includes("ID:")) {
    setTimeout(() => {
      this.router.navigateByUrl('landingPage');
    }, 5000); // 5000 milliseconds = 5 seconds
  }
  if (this.instruction.includes("Returning")) {
    setTimeout(() => {
      this.router.navigateByUrl('landingPage');
    });
  }
  this.inputElement.nativeElement.value = '';
  this.inputElement.nativeElement.focus();
}
}
