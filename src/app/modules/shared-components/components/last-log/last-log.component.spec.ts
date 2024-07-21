import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLogComponent } from './last-log.component';

describe('LastLogComponent', () => {
  let component: LastLogComponent;
  let fixture: ComponentFixture<LastLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
