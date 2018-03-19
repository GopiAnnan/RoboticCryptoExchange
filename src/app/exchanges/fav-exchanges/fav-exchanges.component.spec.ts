import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavExchangesComponent } from './fav-exchanges.component';

describe('FavExchangesComponent', () => {
  let component: FavExchangesComponent;
  let fixture: ComponentFixture<FavExchangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavExchangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavExchangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
