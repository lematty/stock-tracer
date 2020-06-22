import { TestBed } from '@angular/core/testing';

import { FormatTableDataService } from './format-table-data.service';

describe('FormatTableDataService', () => {
  let service: FormatTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatTableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
