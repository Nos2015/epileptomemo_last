import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NbacktrainingComponent } from './nbacktraining.component';

describe('NbacktrainingComponent', () => {
  let component: NbacktrainingComponent;
  let fixture: ComponentFixture<NbacktrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NbacktrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NbacktrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
