import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCookieFormComponent } from './configuration-cookie-form.component';

describe('ConfigurationCookieFormComponent', () => {
  let component: ConfigurationCookieFormComponent;
  let fixture: ComponentFixture<ConfigurationCookieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationCookieFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationCookieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
