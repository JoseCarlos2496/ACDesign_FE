import { Constantes } from './../../constantes';
import { Persona } from 'src/Interfaces/IPersona';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendPersonaService {
  constructor(private http: HttpClient, protected _constantes: Constantes) {
    console.log('Servicio Persona listo');
  }
  url: string = this._constantes.baseBackEndHttp + '/Persona';
  token = sessionStorage.getItem('Token');

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + this.token);

  public getAll() {
    return this.http.get(this.url, { headers: this.headers });
  }

  public getById(id: number) {
    return this.http.get(this.url + '/' + id, { headers: this.headers });
  }

  public getByIdentificacion(identificacion: string) {
    return this.http.get(
      this.url + '/GetPersonaByIdentificacion/' + identificacion,
      {
        headers: this.headers,
      }
    );
    //return data;
  }

  public post(persona: Persona) {
    return this.http.post(this.url, persona, { headers: this.headers });
  }

  public put(persona: Persona) {
    return this.http.put(this.url, persona, { headers: this.headers });
  }

  public deleteF(id: number) {
    return this.http.delete(this.url + '/' + id, {
      headers: this.headers,
    });
  }

  public deleteL(persona: Persona) {
    return this.http.patch(this.url, persona, { headers: this.headers });
  }
}
