import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportShareComponent } from './report-share.component';

describe('ReportShareComponent', () => {
  let component: ReportShareComponent;
  let fixture: ComponentFixture<ReportShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportShareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
