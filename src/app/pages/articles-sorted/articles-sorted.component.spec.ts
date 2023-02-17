import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesSortedComponent } from './articles-sorted.component';

describe('ArticlesSortedComponent', () => {
  let component: ArticlesSortedComponent;
  let fixture: ComponentFixture<ArticlesSortedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticlesSortedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesSortedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
