import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingMsgComponent } from './landing-msg.component';

describe('LandingMsgComponent', () => {
  let component: LandingMsgComponent;
  let fixture: ComponentFixture<LandingMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingMsgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
