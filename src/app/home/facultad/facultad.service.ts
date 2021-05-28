import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facultad } from 'src/app/home/facultad/facultad.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FacultadService {
  constructor(private http: HttpClient) {}

  getFacultad(facultad: Facultad) {
    const url = environment.BACKEND_URL + `facultades/${facultad.id}`;
    return this.http.get<Facultad>(url);
  }
}
