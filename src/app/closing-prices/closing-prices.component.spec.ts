import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingPricesComponent } from './closing-prices.component';

describe('ClosingPricesComponent', () => {
  let component: ClosingPricesComponent;
  let fixture: ComponentFixture<ClosingPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosingPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
