import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualpatternComponent } from './visualpattern.component';

describe('VisualpatternComponent', () => {
  let component: VisualpatternComponent;
  let fixture: ComponentFixture<VisualpatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualpatternComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualpatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
