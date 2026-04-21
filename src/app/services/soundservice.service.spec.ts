import { TestBed } from '@angular/core/testing';

import { SoundserviceService } from './soundservice.service';

describe('SoundserviceService', () => {
  let service: SoundserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoundserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
