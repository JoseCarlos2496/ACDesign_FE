import { uuid } from './../../Interfaces/IUUID';
import { Constantes } from './../../constantes';
import { Combo } from '../../Interfaces/ICombo';
import { Usuario, usuarioDefault } from './../../Interfaces/IUsuario';
import { BackendUsuarioService } from './../../Services/Usuario/backend-usuario.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { map } from 'rxjs/operators';
import { ModalService } from '../../Services/Modal/modal.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent {
  title = 'Modulo de Usuario';

  usuarioItem = usuarioDefault;
  usuarioslista: Array<Usuario> = [];
  columnas: string[] = [
    'Nombre de Usuario',
    'Rol',
    'Correo',
    'Editar',
    'Eliminar',
  ];

  constructor(
    public _usuarioService: BackendUsuarioService,
    private _formBuilder: FormBuilder,
    protected _modalService: ModalService,
    protected _constantes: Constantes
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
    this.cleanData();
  }

  //Objeto para atar componente - html
  id: number = 0;
  username: string = '';
  contrasena: string = '';
  rol: string = '';
  email: string = '';
  mensaje: any = '';
  hide = true;
  roles: Combo[] = [
    { value: 'Admin', viewValue: 'Administrador' },
    { value: 'Vendedor', viewValue: 'Vendedor' },
  ];

  correo = new FormControl(this.email, [Validators.required, Validators.email]);

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  personasFormBuilder = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  cleanData() {
    this.id = 0;
    this.username = '';
    this.contrasena = '';
    this.rol = '';
    this.email = '';
    this.usuarioItem = usuarioDefault;
  }

  cargaModal() {
    let usuario: Usuario;
    let nombreItem = 'usuario';

    const data = localStorage.getItem(nombreItem);

    if (data !== undefined) {
      usuario = JSON.parse(data!);
      this.id = usuario.id;
      this.username = usuario.username;
      //this.contrasena = usuario.contrasena;
      this.rol = usuario.rol;
      this.email = usuario.email;
    }
    localStorage.removeItem(nombreItem);
  }

  logChange(index: any) {
    this.getUsuarios();
    this.cleanData();
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  getErrorMessage() {
    if (this.correo.hasError('required')) {
      return 'El campo no puede estas vacío';
    }
    return this.correo.hasError('email') ? 'No es un email válido' : '';
  }

  async usernameLostfocus(username: string) {
    await this.getUsuarioByUsername(username);
  }

  async getUsuarios() {
    let data = await this._usuarioService
      .getAll()
      .pipe(map((resp: any) => resp.data))
      .toPromise();
    this.usuarioslista = data;
  }

  async getUsuarioByUsername(username: string) {
    if (username == '' || username == null) {
      window.alert('La nombre de usuario no puede ser vacio o nulo');
    } else {
      let response: any;
      try {
        response = await this._usuarioService
          .getByUsername(username)
          .pipe(map((resp: any) => resp))
          .toPromise();
        this.usuarioItem = response.data;
        this.mensaje = response;

        this.id = this.usuarioItem.id;
        this.username = this.usuarioItem.username;
        this.contrasena = this.usuarioItem.contrasena;
        this.rol = this.usuarioItem.rol;
        this.email = this.usuarioItem.email;
      } catch (Excepcion) {
        if (response == undefined) {
          window.alert('No existe usuario');
        }
        //this.cleanData();
      }
    }
  }

  async addUsuario() {
    const nuevaUsuario: Usuario = {
      id: this.id,
      username: this.username,
      contrasena: this.contrasena,
      rol: this.rol,
      email: this.email,
    };

    let data = await this._usuarioService
      .post(nuevaUsuario)
      .pipe(map((resp: any) => resp.data))
      .toPromise();

    window.alert(data.message);

    this.cleanData();
  }

  async updateUsuario() {
    const actualizaUsuario: Usuario = {
      id: this.id,
      username: this.username,
      contrasena: this.contrasena,
      rol: this.rol,
      email: this.email,
    };

    let data = await this._usuarioService
      .put(actualizaUsuario)
      .pipe(map((resp: any) => resp))
      .toPromise();

    window.alert(data.message);

    this.cleanData();
    this._modalService.close();
    this.logChange(1);
  }

  async deleteLUsuario(element: Usuario) {
    const eliminaLogicoUsuario: Usuario = {
      id: element.id,
      username: element.username,
      contrasena: element.contrasena,
      rol: element.rol,
      email: element.email,
    };

    let data = await this._usuarioService
      //.deleteL(element)
      .deleteL(eliminaLogicoUsuario)
      .pipe(map((resp: any) => resp))
      .toPromise();

    window.alert(data.message);

    this.cleanData();
    this.logChange(1);
    //location.reload();
  }
}
