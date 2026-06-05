import { TestBed } from '@angular/core/testing';

import { DetallePublicacion } from './detalle-publicacion';

describe('DetallePublicacion', () => {
  let service: DetallePublicacion;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallePublicacion);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
