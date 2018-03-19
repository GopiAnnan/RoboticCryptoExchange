import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOrderHistoryComponent } from './market-order-history.component';

describe('MarketOrderHistoryComponent', () => {
  let component: MarketOrderHistoryComponent;
  let fixture: ComponentFixture<MarketOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
