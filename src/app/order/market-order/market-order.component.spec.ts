import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketOrderComponent } from './market-order.component';

describe('MarketOrderComponent', () => {
  let component: MarketOrderComponent;
  let fixture: ComponentFixture<MarketOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
