import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login.component';
import { VentaComponent } from './Venta/venta.component';
import { PersonaComponent } from './Persona/persona.component';
import { ProductoServicioComponent } from './ProductoServicio/producto-servicio.component';
import { UsuarioComponent } from './Usuario/usuario.component';
import { AppComponent } from './app.component';
import { NotaVentaComponent } from './NotaVenta/nota-venta.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'notaventa',
    component: NotaVentaComponent,
  },
  {
    path: 'persona',
    component: PersonaComponent,
  },
  {
    path: 'productoservicio',
    component: ProductoServicioComponent,
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },
  {
    path: 'venta',
    component: VentaComponent,
  },
  {
    path: 'inicio',
    component: AppComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
