export interface ProductoServicio {
  id: number;
  nombre: string;
  descripcion: string;
  pvp: number;
  categoria: number;
  categoriaCadena: string;
  seguimiento: string;
}

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  total: number;
  pvp: number;
}

export interface ProductoCarrito {
  id: number;
  nombre: string;
  descripcion: string;
  cantidad: number;
  total: number;
  pvp: number;
}

export const productoDefault: ProductoServicio = {
  id: 0,
  nombre: '',
  descripcion: '',
  pvp: 0,
  categoria: 0,
  categoriaCadena: '',
  seguimiento: '',
};
