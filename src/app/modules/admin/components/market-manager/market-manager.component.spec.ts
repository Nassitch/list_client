import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketManagerComponent } from './market-manager.component';

describe('MarketManagerComponent', () => {
  let component: MarketManagerComponent;
  let fixture: ComponentFixture<MarketManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
