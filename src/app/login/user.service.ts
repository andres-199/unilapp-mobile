import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Publicaciones } from '../publications/publicaciones.interface';
import { Persona } from './interfaces/persona.interface';
import { Usuario } from './interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendUrl = environment.BACKEND_URL;

  public get isLogedIn(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  public get user(): Usuario {
    return JSON.parse(localStorage.getItem('user'));
  }

  public set user(value: Usuario) {
    localStorage.setItem('user', JSON.stringify(value));
  }

  constructor(private router: Router, private http: HttpClient) {}

  public login(loginData: Usuario) {
    const url = this.backendUrl + 'auth/login';
    return this.http.post(url, loginData);
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  public register(persona: Persona) {
    const url = environment.BACKEND_URL + 'personas';
    return this.http.post(url, persona);
  }

  get publicaciones$() {
    const personaI = this.user.Persona.id;
    const url = environment.BACKEND_URL + `personas/${personaI}/publicaciones`;
    return this.http.get<Publicaciones>(url);
  }

  sendCode(email: string) {
    const url = environment.BACKEND_URL + 'auth/send-code';
    return this.http.post(url, { email });
  }

  accountRecovery(code) {
    const url = environment.BACKEND_URL + 'auth/account-recovery';
    return this.http.post(url, { code });
  }

  updatePassword(password) {
    const user = this.user;
    user.contrasena = password;
    const url = environment.BACKEND_URL + 'usuarios';
    return this.http.put(url, user);
  }
}
