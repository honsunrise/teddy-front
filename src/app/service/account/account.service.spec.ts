import { inject, TestBed } from '@angular/core/testing';

import { ContentService } from './account.service';

describe('ContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentService]
    });
  });

  it('should be created', inject([ContentService], (service: ContentService) => {
    expect(service).toBeTruthy();
  }));
});
