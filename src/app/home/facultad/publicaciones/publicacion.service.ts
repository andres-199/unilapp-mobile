import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado } from 'src/app/interfaces/estado.interface';
import { Finalidad } from 'src/app/interfaces/finalidad.interface';
import { ImageUploadResponse } from 'src/app/interfaces/image-upload-response';
import { TipoPublicacion } from 'src/app/interfaces/tipo-publicacion.interface';
import { environment } from 'src/environments/environment';
import { Facultad } from '../facultad.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  constructor(private http: HttpClient) {}

  get getFinalidades() {
    const url = environment.BACKEND_URL + 'finalidades';
    return this.http.get<Finalidad[]>(url);
  }

  get getestados() {
    const url = environment.BACKEND_URL + 'estados';
    return this.http.get<Estado[]>(url);
  }

  uploadImages(files: FileList) {
    if (!files.length) {
      return;
    }
    const data = this.createFormDataWithFiles(files);
    const url = `${environment.STORAGE}upload-img`;
    return this.http.post<ImageUploadResponse[]>(url, data);
  }

  private createFormDataWithFiles(files: FileList) {
    const formData = new FormData();
    for (const key in files) {
      if (files.hasOwnProperty(key)) {
        const file = files[key];
        formData.append('file', file);
      }
    }
    return formData;
  }

  get getFacultades() {
    const url = environment.BACKEND_URL + 'facultades';
    return this.http.get<Facultad[]>(url);
  }

  get getTipoPublicaciones() {
    const url = environment.BACKEND_URL + 'tipo-publicaciones';
    return this.http.get<TipoPublicacion[]>(url);
  }
}
