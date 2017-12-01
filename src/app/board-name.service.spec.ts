import { TestBed, inject } from '@angular/core/testing';

import { BoardNameService } from './board-name.service';

describe('BoardNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoardNameService]
    });
  });

  it('should ...', inject([BoardNameService], (service: BoardNameService) => {
    expect(service).toBeTruthy();
  }));
});
