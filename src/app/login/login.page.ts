import { Component, OnInit } from '@angular/core';
import { Usuario } from './interfaces/usuario.interface';
import md5 from 'md5';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: Usuario = {};
  isLogin = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async onClickLogin(form: NgForm) {
    if (!this.user.usuario || !this.user.contrasena) {
      return false;
    }

    if (form.invalid) {
      const toast = await this.toastController.create({
        message: 'Ingrese un correo valido ⚠',
        duration: 3000,
      });
      await toast.present();
      return false;
    }

    const loading = await this.loadingController.create({
      message: 'Ingresando...',
    });
    await loading.present();

    this.user.contrasena = md5(this.user.contrasena);

    this.userService.login(this.user).subscribe({
      next: async (user) => {
        await loading.dismiss();
        this.userService.user = user;
        this.router.navigate(['']);
      },
      error: async (e) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message:
            'No es posible ingresar 😰, porfavor verifique la información e intente de nuevo.',
          duration: 3000,
        });
        await toast.present();
      },
    });
  }
}
