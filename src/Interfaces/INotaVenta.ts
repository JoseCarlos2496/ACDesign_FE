export interface CabeceraNotaVenta {
  id: number;
  idPersona: number;
  fechaEmision: Date;
  guiaRemision: string;
  fechaCaducidad: Date;
  datosImprenta: string;
  formaPago: string;
}

export const cabeceraNotaVenta: CabeceraNotaVenta = {
  id: 0,
  idPersona: 0,
  fechaEmision: new Date(),
  guiaRemision: '',
  fechaCaducidad: new Date(),
  datosImprenta: '',
  formaPago: 'Efectivo',
};

export interface ProductoTMP {
  idProducto: number;
  cantidad: number;
  total: number;
}

export interface DetalleNotaVenta {
  id: number;
  idCabecera: number;
  productos: ProductoTMP[];
}

export const detalleNotaVentaDefault: DetalleNotaVenta = {
  id: 0,
  idCabecera: 0,
  productos: [],
};
export const productoTMPDefault: ProductoTMP = {
  idProducto: 0,
  cantidad: 0,
  total: 0,
};

export interface NotaVenta extends CabeceraNotaVenta, DetalleNotaVenta {}

export const notaVentaDefault: NotaVenta = {
  id: 0,
  datosImprenta: '',
  fechaCaducidad: new Date(),
  fechaEmision: new Date(),
  formaPago: '',
  guiaRemision: '',
  idCabecera: 0,
  idPersona: 0,
  productos: [],
  //cantidad: 0,
  //idProducto: 0,
  //total: 0,
};
