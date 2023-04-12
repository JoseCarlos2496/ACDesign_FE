import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackendPersonaService } from './backend-persona.service';

describe('BackendPersonaService', () => {
  let service: BackendPersonaService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BackendPersonaService],
    })
  );

  it('should be created', () => {
    const service: BackendPersonaService = TestBed.get(BackendPersonaService);
    expect(service).toBeTruthy();
  });
});
