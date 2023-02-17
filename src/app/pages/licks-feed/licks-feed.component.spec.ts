import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicksFeedComponent } from './licks-feed.component';

describe('LicksFeedComponent', () => {
  let component: LicksFeedComponent;
  let fixture: ComponentFixture<LicksFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicksFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicksFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
