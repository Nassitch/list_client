import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologieCardComponent } from './technologie-card.component';

describe('TechnologieCardComponent', () => {
  let component: TechnologieCardComponent;
  let fixture: ComponentFixture<TechnologieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologieCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TechnologieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
