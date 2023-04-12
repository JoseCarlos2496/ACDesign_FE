import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackendProductoServicioService } from './backend-producto-servicio.service';

describe('BackendProductoServicioService', () => {
  let service: BackendProductoServicioService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BackendProductoServicioService],
    })
  );

  it('should be created', () => {
    const service: BackendProductoServicioService = TestBed.get(
      BackendProductoServicioService
    );
    expect(service).toBeTruthy();
  });
});
