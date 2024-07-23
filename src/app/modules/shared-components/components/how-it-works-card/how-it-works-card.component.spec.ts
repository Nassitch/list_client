import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowItWorksCardComponent } from './how-it-works-card.component';

describe('HowItWorksCardComponent', () => {
  let component: HowItWorksCardComponent;
  let fixture: ComponentFixture<HowItWorksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowItWorksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
