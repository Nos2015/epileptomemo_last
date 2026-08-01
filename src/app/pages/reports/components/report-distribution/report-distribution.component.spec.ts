import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDistributionComponent } from './report-distribution.component';

describe('ReportDistributionComponent', () => {
  let component: ReportDistributionComponent;
  let fixture: ComponentFixture<ReportDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
