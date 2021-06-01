import { Persona } from './persona.interface';

export interface Usuario {
  id?: number;
  usuario?: string;
  contrasena?: string;
  Persona?: Persona;
}
