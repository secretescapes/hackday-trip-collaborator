import { TestBed, inject } from '@angular/core/testing';

import { MonthsService } from './months.service';

describe('MonthsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthsService]
    });
  });

  it('should ...', inject([MonthsService], (service: MonthsService) => {
    expect(service).toBeTruthy();
  }));
});
