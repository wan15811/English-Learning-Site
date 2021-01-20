import { TestBed } from '@angular/core/testing';

import { VocabserviceService } from './vocabservice.service';

describe('VocabserviceService', () => {
  let service: VocabserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocabserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
