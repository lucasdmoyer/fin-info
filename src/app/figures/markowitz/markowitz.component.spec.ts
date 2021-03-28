import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkowitzComponent } from './markowitz.component';

describe('MarkowitzComponent', () => {
  let component: MarkowitzComponent;
  let fixture: ComponentFixture<MarkowitzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkowitzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkowitzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
