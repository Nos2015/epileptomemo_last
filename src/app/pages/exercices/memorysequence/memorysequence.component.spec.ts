import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorysequenceComponent } from './memorysequence.component';

describe('MemorysequenceComponent', () => {
  let component: MemorysequenceComponent;
  let fixture: ComponentFixture<MemorysequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemorysequenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorysequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
