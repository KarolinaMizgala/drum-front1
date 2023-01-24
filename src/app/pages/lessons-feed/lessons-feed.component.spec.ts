import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsFeedComponent } from './lessons-feed.component';

describe('LessonsFeedComponent', () => {
  let component: LessonsFeedComponent;
  let fixture: ComponentFixture<LessonsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonsFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
