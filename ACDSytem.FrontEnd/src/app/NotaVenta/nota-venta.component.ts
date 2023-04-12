import { ProductoCarrito } from './../../Interfaces/IProductoServicio';
import { Persona, personaDefault } from './../../Interfaces/IPersona';
import { Constantes } from './../../constantes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  CabeceraNotaVenta,
  DetalleNotaVenta,
  productoTMPDefault,
} from './../../Interfaces/INotaVenta';
import { BackendNotaVentaService } from './../../Services/NotaVenta/backend-nota-venta.service';
import { ProductoTMP } from './../../Interfaces/INotaVenta';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-nota-venta',
  templateUrl: './nota-venta.component.html',
  styleUrls: ['./nota-venta.component.css'],
})
export class NotaVentaComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;

  title = 'Modulo de Usuario';

  ocultar = true;
  idCabecera = 0;
  idPersona = 0;
  fechaEmision = new Date();
  fecha: string =
    new Date().getDate() +
    ' - ' +
    (new Date().getMonth() + 1) +
    ' - ' +
    new Date().getFullYear();
  guiaRemision = '';
  fechaCaducidad = new Date();
  datosImprenta = '';
  formaPago = 'Efectivo';

  idDetalle = 0;
  productos: Array<ProductoTMP> = [];

  carrito: Array<ProductoCarrito> = [];
  persona = personaDefault;

  constructor(
    public _notaVenta: BackendNotaVentaService,
    protected _constantes: Constantes
  ) {
    let productos: any = localStorage.getItem('carrito');
    this.carrito = JSON.parse(productos) as Array<ProductoCarrito>;
    this.mapPersona();
    this.getSiguienteIdCabecera();
    this.ocultar = true;
  }

  mapPersona() {
    let data: any = localStorage.getItem('persona');
    this.persona = JSON.parse(data) as Persona;
  }

  total() {
    let sum = 0;
    this.carrito.forEach((result) => {
      sum += result.cantidad * result.pvp;
    });
    return sum;
  }

  async getSiguienteIdCabecera() {
    let data = await this._notaVenta
      .getSiguienteNotaVentaCabeceraNotaVenta()
      .pipe(map((resp: any) => resp.data))
      .toPromise();
    this.idCabecera = data;
  }

  async addCabecera() {
    const nuevaCabecera: CabeceraNotaVenta = {
      id: this.idCabecera,
      idPersona: this.persona.id,
      fechaEmision: this.fechaEmision,
      fechaCaducidad: this.fechaCaducidad,
      guiaRemision: this.guiaRemision,
      datosImprenta: this.datosImprenta,
      formaPago: this.formaPago,
    };

    let data = await this._notaVenta
      .postCabeceraNotaVenta(nuevaCabecera)
      .pipe(map((resp: any) => resp.data))
      .toPromise();

    //localStorage.setItem('persona', JSON.stringify(data));
    localStorage.removeItem('persona');
  }

  async addDetalle() {
    const nuevoDetalle: DetalleNotaVenta = {
      id: this.idDetalle,
      idCabecera: this.idCabecera,
      productos: [],
    };

    for (var i = 0; i < this.carrito.length; i++) {
      if (this.carrito[i].cantidad > 0) {
        let prod = productoTMPDefault;
        this.productos.push(
          (prod = {
            idProducto: this.carrito[i].id,
            cantidad: this.carrito[i].cantidad,
            total: this.carrito[i].pvp * this.carrito[i].cantidad,
          })
        );
      }
    }
    nuevoDetalle.productos = this.productos;

    let data = await this._notaVenta
      .postDetalleNotaVenta(nuevoDetalle)
      .pipe(map((resp: any) => resp.data))
      .toPromise();

    localStorage.removeItem('carrito');
  }

  createPdf() {
    this.ocultar = false;
    var doc = new jsPDF('p', 'mm', [900, 605]);

    var pdfjs = document.getElementById('htmlData');

    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs, {
      callback: (doc) => {
        doc.save('NotaVenta' + this.idCabecera + '.pdf');
        //doc.autoPrint();
      },
      x: 10,
      y: 10,
    });
  }

  guardar() {
    this.addCabecera();
    this.addDetalle();
  }
}
