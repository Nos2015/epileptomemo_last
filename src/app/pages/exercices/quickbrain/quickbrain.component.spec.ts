import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickbrainComponent } from './quickbrain.component';

describe('QuickbrainComponent', () => {
  let component: QuickbrainComponent;
  let fixture: ComponentFixture<QuickbrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuickbrainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickbrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
