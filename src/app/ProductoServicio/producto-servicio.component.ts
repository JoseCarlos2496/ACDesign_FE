import { Constantes } from './../../constantes';
import { Combo } from './../../Interfaces/ICombo';
import { FloatLabelType } from '@angular/material/form-field';
import { ModalService } from './../../Services/Modal/modal.service';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  ProductoServicio,
  productoDefault,
} from './../../Interfaces/IProductoServicio';
import { BackendProductoServicioService } from './../../Services/ProductoServicio/backend-producto-servicio.service';

import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-producto-servicio',
  templateUrl: './producto-servicio.component.html',
  styleUrls: ['./producto-servicio.component.css'],
})
export class ProductoServicioComponent {
  title = 'Modulo de Productos y Servicios';
  productoItem = productoDefault;

  productoserviciolista: Array<ProductoServicio> = [];
  columnas: string[] = [
    'Nombre',
    'Descripcion',
    'PVP',
    'Categoria',
    'Editar',
    'Eliminar',
  ];
  categorias: Combo[] = [
    { value: 'Producto', viewValue: 'Producto' },
    { value: 'Servicio', viewValue: 'Servicio' },
  ];

  //Objeto para atar componente - html
  id: number = 0;
  nombre: string = '';
  descripcion: string = '';
  pvp: number = 0.0;
  categoria: string = '';
  seguimiento: string = '';
  mensaje: string = '';

  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    public _productoServicioService: BackendProductoServicioService,
    protected _modalService: ModalService,
    protected _constantes: Constantes
  ) {}

  ngOnInit(): void {
    this.getProductosServicios();
    this.cleanData();
  }

  cleanData() {
    this.id = 0;
    this.nombre = '';
    this.descripcion = '';
    this.id = 0.0;
    this.categoria = '';
    this.seguimiento = '';
    this.mensaje = '';
    this.productoItem = productoDefault;
  }

  logChange(index: any) {
    this.getProductosServicios();
    this.cleanData();
  }

  cargaModal() {
    let productoServicio: ProductoServicio;
    let nombreItem = 'productoServicio';

    const data = localStorage.getItem(nombreItem);

    if (data !== undefined) {
      productoServicio = JSON.parse(data!);
      this.id = productoServicio.id;
      this.nombre = productoServicio.nombre;
      this.descripcion = productoServicio.descripcion;
      this.pvp = productoServicio.pvp;
      this.categoria = productoServicio.categoriaCadena;
      this.seguimiento = productoServicio.seguimiento;
    }
    localStorage.removeItem(nombreItem);
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  async usernameLostfocus(id: number) {
    await this.getProductoServicioById(id);
  }

  async getProductosServicios() {
    let data = await this._productoServicioService
      .getAll()
      .pipe(map((resp: any) => resp.data))
      .toPromise();
    this.productoserviciolista = data;
  }

  async getProductoServicioById(id: number) {
    if (id == 0 || id == null) {
      window.alert('El id no puede ser vacio o nulo');
    } else {
      let response: any;
      try {
        response = await this._productoServicioService
          .getById(id)
          .pipe(map((resp: any) => resp))
          .toPromise();
        this.productoItem = response.data;
        this.mensaje = response.message;

        this.id = this.productoItem.id;
        this.nombre = this.productoItem.nombre;
        this.descripcion = this.productoItem.descripcion;
        this.pvp = this.productoItem.pvp;
        this.categoria = this.productoItem.categoriaCadena;
        this.seguimiento = this.productoItem.seguimiento;
      } catch (Excepcion) {
        if (response == undefined) {
          window.alert('No existe producto o servicio');
        }
        this.cleanData();
      }
    }
  }

  async addProductoServicio() {
    const nuevoProductoServicio: ProductoServicio = {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      pvp: this.pvp,
      categoria: 0,
      categoriaCadena: this.categoria,
      seguimiento: this.seguimiento,
    };

    if (this.categoria === 'Producto') {
      nuevoProductoServicio.categoria = 1;
    } else if (this.categoria === 'Servicio') {
      nuevoProductoServicio.categoria = 2;
    }

    let data = await this._productoServicioService
      .post(nuevoProductoServicio)
      .pipe(map((resp: any) => resp.data))
      .toPromise();

    this.cleanData();
  }

  async updateProductoServicio() {
    const actualizaProductoServicio: ProductoServicio = {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      pvp: this.pvp,
      categoria: 0,
      categoriaCadena: this.categoria,
      seguimiento: this.seguimiento,
    };

    if (this.categoria === 'Producto') {
      actualizaProductoServicio.categoria = 1;
    } else if (this.categoria === 'Servicio') {
      actualizaProductoServicio.categoria = 2;
    }

    let data = await this._productoServicioService
      .put(actualizaProductoServicio)
      .pipe(map((resp: any) => resp))
      .toPromise();

    this.cleanData();
    this._modalService.close();
    this.logChange(1);
  }

  async deleteProductoServicioL(element: ProductoServicio) {
    const eliminaLogicoProductoServicio: ProductoServicio = {
      id: element.id,
      nombre: element.nombre,
      descripcion: element.descripcion,
      pvp: element.pvp,
      categoria: 0,
      categoriaCadena: element.categoriaCadena,
      seguimiento: element.seguimiento,
    };

    if (this.categoria === 'Producto') {
      eliminaLogicoProductoServicio.categoria = 1;
    } else if (this.categoria === 'Servicio') {
      eliminaLogicoProductoServicio.categoria = 2;
    }

    let data = await this._productoServicioService
      .deleteL(element)
      //.deleteL(eliminaLogicoProductoServicio)
      .pipe(map((resp: any) => resp))
      .toPromise();

    this.cleanData();
    this.logChange(1);
  }
}
