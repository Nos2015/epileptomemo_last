import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrisistimelineComponent } from './crisistimeline.component';

describe('CrisistimelineComponent', () => {
  let component: CrisistimelineComponent;
  let fixture: ComponentFixture<CrisistimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrisistimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrisistimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
