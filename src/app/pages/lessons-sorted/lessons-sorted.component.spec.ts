import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsSortedComponent } from './lessons-sorted.component';

describe('LessonsSortedComponent', () => {
  let component: LessonsSortedComponent;
  let fixture: ComponentFixture<LessonsSortedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsSortedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
