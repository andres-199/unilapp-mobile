import { Publicacion } from 'src/app/home/facultad/publicaciones/publicacion.interface';

export interface Facultad {
  id?: number;
  nombre?: string;
  descripción?: string;
  imagen?: string;
  Empleos?: Publicacion[];
  Servicios?: Publicacion[];
  Productos?: Publicacion[];
}
