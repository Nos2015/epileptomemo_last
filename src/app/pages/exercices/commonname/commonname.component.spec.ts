import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonnameComponent } from './commonname.component';

describe('CommonnameComponent', () => {
  let component: CommonnameComponent;
  let fixture: ComponentFixture<CommonnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonnameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
