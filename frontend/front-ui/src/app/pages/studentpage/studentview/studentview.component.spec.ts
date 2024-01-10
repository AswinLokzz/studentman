import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentviewComponent } from './studentview.component';

describe('StudentviewComponent', () => {
  let component: StudentviewComponent;
  let fixture: ComponentFixture<StudentviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentviewComponent]
    });
    fixture = TestBed.createComponent(StudentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
