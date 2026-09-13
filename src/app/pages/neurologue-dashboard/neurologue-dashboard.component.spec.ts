import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeurologueDashboardComponent } from './neurologue-dashboard.component';

describe('NeurologueDashboardComponent', () => {
  let component: NeurologueDashboardComponent;
  let fixture: ComponentFixture<NeurologueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NeurologueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeurologueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
