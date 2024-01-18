import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeefilterComponent } from './feefilter.component';

describe('FeefilterComponent', () => {
  let component: FeefilterComponent;
  let fixture: ComponentFixture<FeefilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeefilterComponent]
    });
    fixture = TestBed.createComponent(FeefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
