import { TestBed } from '@angular/core/testing';

import { HandleFormErrorService } from './handle-form-error.service';

describe('HandleFormErrorService', () => {
  let service: HandleFormErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleFormErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
