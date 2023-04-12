import { Constantes } from './../../constantes';
import { Producto } from '../../Interfaces/IProductoServicio';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BackendProductoServicioService } from '../../Services/ProductoServicio/backend-producto-servicio.service';
import { uuid } from 'src/Interfaces/IUUID';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent implements OnInit {
  title = 'Modulo de Nota Venta';
  //currentItem = productoDefault;

  displayedColumns: string[] = ['Cantidad', 'Nombre', 'Valor Unitario', 'PVP'];
  products: Array<Producto> = [];
  productSubjects: BehaviorSubject<Array<Producto>> = new BehaviorSubject(
    this.products
  );
  listProducts: Observable<Array<Producto>> =
    this.productSubjects.asObservable();

  cart: Array<Producto> = [];

  constructor(
    public _productServices: BackendProductoServicioService,
    private cdRef: ChangeDetectorRef,
    protected _constantes: Constantes
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.listProducts.subscribe((prods) => (this.products = prods));
    this.listProducts.subscribe((prods) => (this.cart = prods));
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  addItem(item: Producto) {
    let index = this.cart.findIndex(
      (result) => result.idProducto === item.idProducto
    );
    if (index === 0) {
      item.cantidad++;
    }
  }

  removeItem(item: Producto) {
    if (item.cantidad > 0) {
      let index = this.cart.findIndex(
        (result) => result.idProducto === item.idProducto
      );
      if (index === 0) {
        item.cantidad--;
      }
    }
  }

  total() {
    let sum = 0;
    this.cart.forEach((result) => {
      sum += result.cantidad * result.pvp;
    });
    return sum;
  }

  cartFinal() {
    localStorage.setItem('carrito', JSON.stringify(this.cart));
    location.href = this._constantes.notaVenta;
  }

  async getProducts() {
    let data = await this._productServices
      .getAll()
      .pipe(map((resp: any) => resp.data))
      .toPromise();
    data.map((res: any) => {
      this.products.push({ ...res, cantidad: 0, total: 0 });
    });
  }
}
