import { Component, OnInit } from '@angular/core';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.css']
})
export class EmergencyComponent {
  currentTime: Date = new Date();
  greeting: string = '';

  constructor(private timeService: TimeService){}

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

}
