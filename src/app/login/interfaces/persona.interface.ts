import { Usuario } from './usuario.interface';

export interface Persona {
  id?: number;
  nombre?: string;
  apellido?: string;
  correo?: string;
  Usuario?: Usuario;
}
