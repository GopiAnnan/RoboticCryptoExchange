import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMarketComponent } from './display-market.component';

describe('DisplayMarketComponent', () => {
  let component: DisplayMarketComponent;
  let fixture: ComponentFixture<DisplayMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
