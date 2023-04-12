import { Constantes } from './../../constantes';
import { Usuario, UsuarioAux } from './../../Interfaces/IUsuario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from '../Modal/modal.service';

@Injectable({
  providedIn: 'root',
})
export class BackendUsuarioService {
  constructor(
    private http: HttpClient,
    protected _modal: ModalService,
    protected _constantes: Constantes
  ) {
    console.log('Servicio Usuario listo');
  }

  url: string = this._constantes.baseBackEndHttp + '/Usuario';
  token = sessionStorage.getItem('Token');

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + this.token);

  open(id: string, data: any) {
    // open modal specified by id
    localStorage.setItem('usuario', JSON.stringify(data));
    const modal = this._modal.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.openU();
  }

  public getAll() {
    return this.http.get(this.url, { headers: this.headers });
  }

  public getById(id: number) {
    return this.http.get(this.url + '/' + id, { headers: this.headers });
  }

  public getByUsername(username: string) {
    return this.http.get(this.url + '/GetUsuarioByUsername/' + username, {
      headers: this.headers,
    });
  }

  public post(usuario: Usuario) {
    return this.http.post(this.url, usuario, { headers: this.headers });
  }

  public put(usuario: Usuario) {
    return this.http.put(this.url, usuario, { headers: this.headers });
  }

  public patch(usuario: UsuarioAux) {
    return this.http.put(this.url, usuario, { headers: this.headers });
  }

  public deleteF(id: number) {
    return this.http.delete(this.url + '/' + id, {
      headers: this.headers,
    });
  }

  public deleteL(usuario: Usuario) {
    return this.http.patch(this.url + '/DeleteL/', usuario, {
      headers: this.headers,
    });
  }
}
