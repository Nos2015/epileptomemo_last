import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStatCardComponent } from './report-stat-card.component';

describe('ReportStatCardComponent', () => {
  let component: ReportStatCardComponent;
  let fixture: ComponentFixture<ReportStatCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportStatCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportStatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
