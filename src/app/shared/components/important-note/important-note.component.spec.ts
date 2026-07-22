import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantNoteComponent } from './important-note.component';

describe('ImportantNoteComponent', () => {
  let component: ImportantNoteComponent;
  let fixture: ComponentFixture<ImportantNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportantNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
