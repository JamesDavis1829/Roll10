import { TestBed } from '@angular/core/testing';

import { DiceLogService } from './dice-log.service';

describe('DiceLogService', () => {
  let service: DiceLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
