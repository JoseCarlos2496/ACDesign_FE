import { Constantes } from './../../constantes';
import { ModalService } from './../Modal/modal.service';
import { ProductoServicio } from './../../Interfaces/IProductoServicio';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendProductoServicioService {
  constructor(
    private http: HttpClient,
    protected _modal: ModalService,
    protected _constantes: Constantes
  ) {
    console.log('Servicio ProductoServicio listo');
  }
  url: string = this._constantes.baseBackEndHttp + '/ProductoServicio';
  token = sessionStorage.getItem('Token');

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + this.token);

  open(id: string, data: any) {
    // open modal specified by id
    localStorage.setItem('productoServicio', JSON.stringify(data));
    const modal = this._modal.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.openPS();
  }

  public getAll() {
    //return this.http.get(this.urlProductoServicio, { headers: this.headers });
    return this.http.get(this.url, { headers: this.headers });
  }

  public getById(id: number) {
    return this.http.get(this.url + '/ById/' + id, {
      headers: this.headers,
    });
  }

  public post(productoServicio: ProductoServicio) {
    return this.http.post(this.url, productoServicio, {
      headers: this.headers,
    });
  }

  public put(productoServicio: ProductoServicio) {
    return this.http.put(this.url, productoServicio, {
      headers: this.headers,
    });
  }

  public deleteF(id: number) {
    return this.http.delete(this.url + '/' + id, {
      headers: this.headers,
    });
  }

  public deleteL(productoServicio: ProductoServicio) {
    return this.http.patch(this.url + '/DeleteL/', productoServicio, {
      headers: this.headers,
    });
  }
}
