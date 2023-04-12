import { Constantes } from './../../constantes';
import { Persona, personaDefault } from './../../Interfaces/IPersona';
import { BackendPersonaService } from './../../Services/Persona/backend-persona.service';
import {
  Component,
  Directive,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { map } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent {
  title = 'Modulo de Persona';
  personaItem = personaDefault;

  //Objeto para atar componente - html
  id: number = 0;
  cedulaRuc: string = '';
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  correo: string = '';
  mensaje: any = '';

  cedula = new FormControl(this.cedulaRuc, [
    Validators.pattern('[0-9]+$'),
    Validators.minLength(10),
  ]);
  email = new FormControl(this.correo, [Validators.required, Validators.email]);

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  constructor(
    public _personaService: BackendPersonaService,
    private _formBuilder: FormBuilder,
    protected _constantes: Constantes
  ) {}

  personasFormBuilder = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  ngOnInit(): void {
    this.cleanData();
  }

  cleanData() {
    this.id = 0;
    this.cedulaRuc = '';
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.correo = '';
    this.personaItem = personaDefault;
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  getCedulaErrorMessage() {
    if (this.cedula.hasError('required')) {
      return 'El campo no puede estas vacío';
    }
    return this.cedula.hasError('pattern')
      ? 'Solo deben de ser valores numéricos'
      : this.cedula.hasError('minlength')
      ? 'Mínimo 10 caracteres'
      : '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'El campo no puede estas vacío';
    }
    return this.email.hasError('email') ? 'No es un correo válido' : '';
  }

  async cedulaLostfocus(cedula: string) {
    await this.getByIdentificacion(cedula);
  }

  async getByIdentificacion(identificacion: string) {
    if (identificacion == '' || identificacion == null) {
      window.alert('La identidicación no puede ser vacio o nulo');
    } else {
      let response: any;
      try {
        response = await this._personaService
          .getByIdentificacion(identificacion)
          .pipe(map((resp: any) => resp))
          .toPromise();
        this.personaItem = response.data;
        this.mensaje = response;

        this.id = this.personaItem.id;
        this.cedulaRuc = this.personaItem.cedulaRUC;
        this.nombre = this.personaItem.nombre;
        this.apellido = this.personaItem.apellido;
        this.telefono = this.personaItem.telefono;
        this.correo = this.personaItem.correo;

        localStorage.setItem('persona', JSON.stringify(this.personaItem));
      } catch (Excepcion) {
        if (response == undefined) {
          window.alert('No existe persona');
        }
        this.cleanData();
      }
    }
  }

  async addPersona() {
    const nuevaPersona: Persona = {
      id: this.id,
      cedulaRUC: this.cedulaRuc,
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      correo: this.correo,
    };

    let data = await this._personaService
      .post(nuevaPersona)
      .pipe(map((resp: any) => resp.data))
      .toPromise();

    localStorage.setItem('persona', JSON.stringify(data));

    this.cleanData();
  }

  async updatePersona() {
    const actualizaPersona: Persona = {
      id: this.id,
      cedulaRUC: this.cedulaRuc,
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      correo: this.correo,
    };

    let data = await this._personaService
      .put(actualizaPersona)
      .pipe(map((resp: any) => resp))
      .toPromise();

    localStorage.setItem('persona', JSON.stringify(this.personaItem));

    this.cleanData();
  }
}
