import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorysequencegameComponent } from './memorysequencegame.component';

describe('MemorysequencegameComponent', () => {
  let component: MemorysequencegameComponent;
  let fixture: ComponentFixture<MemorysequencegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemorysequencegameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemorysequencegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
