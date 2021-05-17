import { Component, OnInit } from '@angular/core';
import { Usuario } from './interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: Usuario = {};
  isLogin = true;
  constructor() {}

  ngOnInit() {}

  onClickLogin() {}
}
