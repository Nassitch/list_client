import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingWindowComponent } from './setting-window.component';

describe('SettingWindowComponent', () => {
  let component: SettingWindowComponent;
  let fixture: ComponentFixture<SettingWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
