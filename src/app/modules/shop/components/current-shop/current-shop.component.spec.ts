import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentShopComponent } from './current-shop.component';

describe('CurrentShopComponent', () => {
  let component: CurrentShopComponent;
  let fixture: ComponentFixture<CurrentShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
