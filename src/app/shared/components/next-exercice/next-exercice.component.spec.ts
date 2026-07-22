import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextExerciceComponent } from './next-exercice.component';

describe('NextExerciceComponent', () => {
  let component: NextExerciceComponent;
  let fixture: ComponentFixture<NextExerciceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextExerciceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextExerciceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
