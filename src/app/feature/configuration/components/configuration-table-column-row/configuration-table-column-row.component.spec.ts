import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTableColumnRowComponent } from './configuration-table-column-row.component';

describe('ConfigurationTableColumnRowComponent', () => {
  let component: ConfigurationTableColumnRowComponent;
  let fixture: ComponentFixture<ConfigurationTableColumnRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationTableColumnRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationTableColumnRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
