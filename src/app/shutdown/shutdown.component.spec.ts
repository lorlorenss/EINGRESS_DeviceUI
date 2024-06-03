import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShutdownComponent } from './shutdown.component';

describe('ShutdownComponent', () => {
  let component: ShutdownComponent;
  let fixture: ComponentFixture<ShutdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShutdownComponent]
    });
    fixture = TestBed.createComponent(ShutdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
