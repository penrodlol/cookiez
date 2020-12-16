import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTableColumnComponent } from './configuration-table-column.component';

describe('ConfigurationTableColumnComponent', () => {
  let component: ConfigurationTableColumnComponent;
  let fixture: ComponentFixture<ConfigurationTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationTableColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
