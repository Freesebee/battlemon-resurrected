import { TestBed } from '@angular/core/testing';

import { BattlemonService } from './battlemon.service';

describe('BattlemonService', () => {
  let service: BattlemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattlemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
