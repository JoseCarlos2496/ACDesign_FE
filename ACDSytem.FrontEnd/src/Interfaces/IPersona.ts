export interface Persona {
  id: number;
  cedulaRUC: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
}

export const personaDefault: Persona = {
  id: 0,
  cedulaRUC: '',
  nombre: '',
  apellido: '',
  telefono: '',
  correo: '',
};
