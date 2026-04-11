import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternbuilderComponent } from './patternbuilder.component';

describe('PatternbuilderComponent', () => {
  let component: PatternbuilderComponent;
  let fixture: ComponentFixture<PatternbuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatternbuilderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatternbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
