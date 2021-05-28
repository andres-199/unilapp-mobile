import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contact } from './contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  get getContactos() {
    const url = environment.BACKEND_URL + 'contactos';
    return this.http.get<Contact[]>(url);
  }
}
