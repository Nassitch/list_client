import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksPageComponent } from './how-it-works-page.component';

describe('HowItWorksPageComponent', () => {
  let component: HowItWorksPageComponent;
  let fixture: ComponentFixture<HowItWorksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HowItWorksPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowItWorksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
