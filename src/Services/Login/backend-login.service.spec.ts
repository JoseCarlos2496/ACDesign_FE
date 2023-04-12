import { Login } from './../../Interfaces/ILogin';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BackendLoginService } from './backend-login.service';

describe('LoginService', () => {
  let service: BackendLoginService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [BackendLoginService],
    })
  );

  it('should be created', () => {
    const service: BackendLoginService = TestBed.get(BackendLoginService);
    expect(service).toBeTruthy();
  });

  it('should have getData function', () => {
    const login: Login = { username: 'admin', password: 'admin' };
    const service: BackendLoginService = TestBed.get(BackendLoginService);
    expect(service.post(login)).toBeTruthy();
  });
});
