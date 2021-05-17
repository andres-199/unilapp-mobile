import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import md5 from 'md5';
import { UserService } from '../user.service';
import { Usuario } from '../interfaces/usuario.interface';
import { Persona } from '../interfaces/persona.interface';
import { BackendResponse } from '../interfaces/backend-response.interface';
export type PasswordRegister = { psw1?: string; psw2?: string };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() onCancel = new EventEmitter();
  @Output() onRegister = new EventEmitter<Usuario>();
  password: PasswordRegister = {};
  persona: Persona = {};
  constructor(
    private toastController: ToastController,
    private userService: UserService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  async onClickRegistrar(form) {
    if (!form.valid) {
      const toast = await this.toastController.create({
        message: 'Debe llenar los campos requeridos',
        buttons: ['Aceptar'],
      });
      await toast.present();
      return false;
    }

    if (this.password.psw1 !== this.password.psw2) {
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar'],
      });
      await toast.present();
      return false;
    }

    this.persona.Usuario = {
      usuario: this.persona.correo,
      contrasena: md5(this.password.psw1),
    };

    await this.register();
  }

  private async register() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    this.userService.register(this.persona).subscribe({
      next: async (response: BackendResponse) => {
        const usuario: Usuario = {
          usuario: this.persona.correo,
        };

        await loading.dismiss();
        const toast = await this.toastController.create({
          message: response.message,
          duration: 5000,
          buttons: [
            {
              text: 'Aceptar',
              handler: () => this.onRegister.emit(usuario),
            },
          ],
        });
        await toast.present();
        this.onRegister.emit(usuario);
      },
      error: async (e) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: e.error.message,
          duration: 3000,
        });
        await toast.present();
      },
    });
  }
}
