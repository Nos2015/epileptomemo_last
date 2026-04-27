import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScattergoriesComponent } from './scattergories.component';

describe('ScattergoriesComponent', () => {
  let component: ScattergoriesComponent;
  let fixture: ComponentFixture<ScattergoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScattergoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScattergoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
