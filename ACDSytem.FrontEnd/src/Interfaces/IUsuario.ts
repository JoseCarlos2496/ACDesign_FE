export interface Usuario {
  id: number;
  username: string;
  contrasena: string;
  rol: string;
  email: string;
}

export const usuarioDefault: Usuario = {
  id: 0,
  username: '',
  contrasena: '',
  rol: '',
  email: '',
};

export interface UsuarioAux {
  id: number;
  username: string;
  rol: string;
  email: string;
}

export const usuarioAuxDefault: UsuarioAux = {
  id: 0,
  username: '',
  rol: '',
  email: '',
};
