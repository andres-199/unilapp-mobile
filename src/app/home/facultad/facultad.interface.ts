import { Publicacion } from 'src/app/interfaces/publicacion.interface';

export interface Facultad {
  id?: number;
  nombre?: string;
  descripción?: string;
  imagen?: string;
  Empleos?: Publicacion[];
  Servicios?: Publicacion[];
  Productos?: Publicacion[];
}
