import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmCardComponent } from './em-card.component';

describe('EmCardComponent', () => {
  let component: EmCardComponent;
  let fixture: ComponentFixture<EmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
