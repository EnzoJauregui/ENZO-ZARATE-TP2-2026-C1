import { TestBed } from '@angular/core/testing';

import { Cronometro } from './cronometro';

describe('Cronometro', () => {
  let service: Cronometro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cronometro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
