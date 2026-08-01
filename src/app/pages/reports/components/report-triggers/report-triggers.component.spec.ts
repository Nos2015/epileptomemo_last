import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTriggersComponent } from './report-triggers.component';

describe('ReportTriggersComponent', () => {
  let component: ReportTriggersComponent;
  let fixture: ComponentFixture<ReportTriggersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportTriggersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportTriggersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
