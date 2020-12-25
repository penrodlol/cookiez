import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRenderObserverComponent } from './table-render-observer.component';

describe('TableRenderObserverComponent', () => {
  let component: TableRenderObserverComponent;
  let fixture: ComponentFixture<TableRenderObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRenderObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRenderObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
