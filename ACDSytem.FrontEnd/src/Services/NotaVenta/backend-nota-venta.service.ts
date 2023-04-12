import { Constantes } from './../../constantes';
import { CabeceraNotaVenta, DetalleNotaVenta } from 'src/Interfaces/INotaVenta';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BackendNotaVentaService {
  constructor(private http: HttpClient, protected _constantes: Constantes) {
    console.log('Servicio NotaVenta listo');
  }
  url: string = this._constantes.baseBackEndHttp + '/';
  urlCabeceraNotaVenta: string = this.url + 'CabeceraNotaVenta';
  urlDetalleNotaVenta: string = this.url + 'NotaVenta';
  token = sessionStorage.getItem('Token');

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', 'Bearer ' + this.token);

  //#region CabeceraNotaVenta
  public getAllCabeceraNotaVenta() {
    return this.http.get(this.urlCabeceraNotaVenta, { headers: this.headers });
  }

  public getByIdCabeceraNotaVenta(id: number) {
    return this.http.get(this.urlCabeceraNotaVenta + '/' + id, {
      headers: this.headers,
    });
  }

  public getSiguienteNotaVentaCabeceraNotaVenta() {
    return this.http.get(this.urlCabeceraNotaVenta + '/GetSiguienteNotaVenta', {
      headers: this.headers,
    });
  }

  public postCabeceraNotaVenta(cabeceraNotaVenta: CabeceraNotaVenta) {
    return this.http.post(this.urlCabeceraNotaVenta, cabeceraNotaVenta, {
      headers: this.headers,
    });
  }

  public putCabeceraNotaVenta(cabeceraNotaVenta: CabeceraNotaVenta) {
    return this.http.put(this.urlCabeceraNotaVenta, cabeceraNotaVenta, {
      headers: this.headers,
    });
  }

  public deleteFCabeceraNotaVenta(id: number) {
    return this.http.delete(this.urlCabeceraNotaVenta + '/' + id, {
      headers: this.headers,
    });
  }

  public deleteLCabeceraNotaVenta(cabeceraNotaVenta: CabeceraNotaVenta) {
    return this.http.patch(this.urlCabeceraNotaVenta, cabeceraNotaVenta, {
      headers: this.headers,
    });
  }
  //#endregion CabeceraNotaVenta

  //#region DetalleNotaVenta
  public getAllDetalleNotaVenta() {
    return this.http.get(this.urlDetalleNotaVenta, { headers: this.headers });
  }

  public getByIdDetalleNotaVenta(id: number) {
    return this.http.get(this.urlDetalleNotaVenta + '/' + id, {
      headers: this.headers,
    });
  }

  public postDetalleNotaVenta(notaVenta: DetalleNotaVenta) {
    console.log('NV', JSON.stringify(notaVenta));
    return this.http.post(this.urlDetalleNotaVenta, notaVenta, {
      headers: this.headers,
    });
  }

  public putDetalleNotaVenta(notaVenta: DetalleNotaVenta) {
    return this.http.put(this.urlDetalleNotaVenta, notaVenta, {
      headers: this.headers,
    });
  }

  public deleteFDetalleNotaVenta(id: number) {
    return this.http.delete(this.urlDetalleNotaVenta + '/' + id, {
      headers: this.headers,
    });
  }

  public deleteLDetalleNotaVenta(notaVenta: DetalleNotaVenta) {
    return this.http.patch(this.urlDetalleNotaVenta, notaVenta, {
      headers: this.headers,
    });
  }
  //#endregion DetalleNotaVenta
}
