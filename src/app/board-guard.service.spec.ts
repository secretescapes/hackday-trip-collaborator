import { TestBed, inject } from '@angular/core/testing';

import { BoardGuardService } from './board-guard.service';

describe('BoardGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardGuardService]
    });
  });

  it('should ...', inject([BoardGuardService], (service: BoardGuardService) => {
    expect(service).toBeTruthy();
  }));
});
