import { Publicacion } from '../home/facultad/publicaciones/publicacion.interface';

export interface Publicaciones {
  Empleos?: Publicacion[];
  Servicios?: Publicacion[];
  Productos?: Publicacion[];
}
