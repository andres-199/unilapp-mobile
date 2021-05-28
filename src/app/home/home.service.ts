import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Facultad } from './facultad/facultad.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  get facultades$() {
    const url = environment.BACKEND_URL + 'facultades';
    return this.http.get<Facultad[]>(url);
  }
}
