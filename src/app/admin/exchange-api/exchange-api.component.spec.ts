import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeApiComponent } from './exchange-api.component';

describe('ExchangeApiComponent', () => {
  let component: ExchangeApiComponent;
  let fixture: ComponentFixture<ExchangeApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
