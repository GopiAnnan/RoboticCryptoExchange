import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllExchangesComponent } from './all-exchanges.component';

describe('AllExchangesComponent', () => {
  let component: AllExchangesComponent;
  let fixture: ComponentFixture<AllExchangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllExchangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
