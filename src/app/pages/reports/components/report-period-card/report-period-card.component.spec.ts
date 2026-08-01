import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPeriodCardComponent } from './report-period-card.component';

describe('ReportPeriodCardComponent', () => {
  let component: ReportPeriodCardComponent;
  let fixture: ComponentFixture<ReportPeriodCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportPeriodCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPeriodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
