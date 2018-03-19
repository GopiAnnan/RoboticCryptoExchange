import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrderHistoryComponent } from './my-order-history.component';

describe('MyOrderHistoryComponent', () => {
  let component: MyOrderHistoryComponent;
  let fixture: ComponentFixture<MyOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
