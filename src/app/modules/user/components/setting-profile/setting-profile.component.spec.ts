import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingProfileComponent } from './setting-profile.component';

describe('SettingProfileComponent', () => {
  let component: SettingProfileComponent;
  let fixture: ComponentFixture<SettingProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
