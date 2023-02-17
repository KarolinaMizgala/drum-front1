import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LickComponent } from './lick.component';

describe('LickComponent', () => {
  let component: LickComponent;
  let fixture: ComponentFixture<LickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
