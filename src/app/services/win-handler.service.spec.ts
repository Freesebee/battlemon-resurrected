import { TestBed } from '@angular/core/testing';

import { WinHandlerService } from './win-handler.service';

describe('WinHandlerService', () => {
  let service: WinHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
