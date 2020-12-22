import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCookieModalComponent } from './edit-cookie-modal.component';

describe('EditCookieModalComponent', () => {
  let component: EditCookieModalComponent;
  let fixture: ComponentFixture<EditCookieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCookieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCookieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
