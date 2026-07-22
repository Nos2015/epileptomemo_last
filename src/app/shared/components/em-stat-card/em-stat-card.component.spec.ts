import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmStatCardComponent } from './em-stat-card.component';

describe('EmStatCardComponent', () => {
  let component: EmStatCardComponent;
  let fixture: ComponentFixture<EmStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmStatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
