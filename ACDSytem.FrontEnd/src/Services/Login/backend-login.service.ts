import { Constantes } from './../../constantes';
import { Login } from '../../Interfaces/ILogin';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendLoginService {
  constructor(private http: HttpClient, protected _constantes: Constantes) {
    console.log('Servicio Login Listo');
  }

  url: string = this._constantes.baseBackEndHttp + '/Login';
  token = sessionStorage.getItem('Token');

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Access-Control-Allow-Origin', 'http://127.0.0.1:7010')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Credentials', 'true')
    .set('Authorization', 'Bearer ' + this.token);

  public post(login: Login) {
    return this.http
      .post(this.url, login, {
        headers: this.headers,
      })
      .pipe(map((resp: any) => sessionStorage.setItem('Token', resp.data)));
  }
}
