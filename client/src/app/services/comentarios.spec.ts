import { TestBed } from '@angular/core/testing';

import { ComentariosService } from './comentarios.service';

describe('Comentarios', () => {
  let service: ComentariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
