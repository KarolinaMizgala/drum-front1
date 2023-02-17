import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicksSortedComponent } from './licks-sorted.component';

describe('LicksSortedComponent', () => {
  let component: LicksSortedComponent;
  let fixture: ComponentFixture<LicksSortedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicksSortedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicksSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
