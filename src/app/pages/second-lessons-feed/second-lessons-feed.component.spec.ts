import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLessonsFeedComponent } from './second-lessons-feed.component';

describe('SecondLessonsFeedComponent', () => {
  let component: SecondLessonsFeedComponent;
  let fixture: ComponentFixture<SecondLessonsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondLessonsFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondLessonsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
