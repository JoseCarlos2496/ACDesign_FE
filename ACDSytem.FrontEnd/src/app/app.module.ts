import { Constantes } from './../constantes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonaComponent } from './Persona/persona.component';
import { LoginComponent } from './Login/login.component';
import { VentaComponent } from './Venta/venta.component';
import { ProductoServicioComponent } from './ProductoServicio/producto-servicio.component';
import { UsuarioComponent } from './Usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalComponent } from './Modal/modal.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotaVentaComponent } from './NotaVenta/nota-venta.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    LoginComponent,
    VentaComponent,
    ProductoServicioComponent,
    UsuarioComponent,
    ModalComponent,
    NotaVentaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModule,

    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,

    BsDropdownModule.forRoot(),
  ],
  providers: [
    NgbActiveModal,
    UsuarioComponent,
    ProductoServicioComponent,
    Constantes,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
