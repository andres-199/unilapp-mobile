import { Contacto } from 'src/app/interfaces/contacto.interface';
import { Estado } from 'src/app/interfaces/estado.interface';
import { Finalidad } from 'src/app/interfaces/finalidad.interface';
import { ImageUploadResponse } from 'src/app/interfaces/image-upload-response';
import { TipoPublicacion } from '../../../interfaces/tipo-publicacion.interface';

export interface Publicacion {
  id?: number;
  tipo_publicacion_id?: number;
  persona_id?: number;
  nombre?: string;
  descripcion?: string;
  imagenes?: ImageUploadResponse[];
  contacto?: Contacto;
  estado_id?: number;
  finalidad_id?: number;
  facultad_id?: number;
  TipoPublicacion?: TipoPublicacion;
  Finalidad?: Finalidad;
  Estado?: Estado;
}
