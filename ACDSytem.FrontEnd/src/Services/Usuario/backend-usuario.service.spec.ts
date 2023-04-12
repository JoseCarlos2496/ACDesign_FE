import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackendUsuarioService } from './backend-usuario.service';

describe('BackendUsuarioService', () => {
  let service: BackendUsuarioService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BackendUsuarioService],
    })
  );

  it('should be created', () => {
    const service: BackendUsuarioService = TestBed.get(BackendUsuarioService);
    expect(service).toBeTruthy();
  });
});
