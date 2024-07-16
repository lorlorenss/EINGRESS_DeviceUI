import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeInternsComponent } from './welcome-interns.component';

describe('WelcomeInternsComponent', () => {
  let component: WelcomeInternsComponent;
  let fixture: ComponentFixture<WelcomeInternsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeInternsComponent]
    });
    fixture = TestBed.createComponent(WelcomeInternsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
