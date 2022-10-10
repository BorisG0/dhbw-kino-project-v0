import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieClickableComponent } from './movie-clickable.component';

describe('MovieClickableComponent', () => {
  let component: MovieClickableComponent;
  let fixture: ComponentFixture<MovieClickableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieClickableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieClickableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
