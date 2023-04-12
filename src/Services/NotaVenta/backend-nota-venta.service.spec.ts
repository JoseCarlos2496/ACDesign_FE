import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackendNotaVentaService } from './backend-nota-venta.service';

describe('BackendCabeceraNotaVentaService', () => {
  let service: BackendNotaVentaService;

  /*
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendCabeceraNotaVentaService);
  });
  */

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BackendNotaVentaService],
    })
  );

  it('should be created', () => {
    const service: BackendNotaVentaService = TestBed.get(
      BackendNotaVentaService
    );
    expect(service).toBeTruthy();
  });
});
