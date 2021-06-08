import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { PasswordRegister } from '../register/register.component';
import { UserService } from '../user.service';
import md5 from 'md5';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.page.html',
  styleUrls: ['./forgotten-password.page.scss'],
})
export class ForgottenPasswordPage implements OnInit {
  email: string;
  emailSended = false;
  accountRecovered = false;
  code: number;
  password: PasswordRegister = {};
  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  async onClickSendCode(emailForm: NgForm) {
    if (emailForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Enviando...',
      });
      await loading.present();

      this.userService.sendCode(this.email).subscribe({
        next: async (res) => {
          await loading.dismiss();
          this.emailSended = true;
          const toast = await this.toastController.create({
            message: res['message'],
            duration: 5000,
          });
          await toast.present();
        },
        error: async (e) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: e.error.message,
            duration: 5000,
          });
          await toast.present();
        },
      });
    }
  }

  async onClickValidateCode(codeForm: NgForm) {
    if (codeForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Validando...',
      });
      await loading.present();

      this.userService.accountRecovery(this.code.toString()).subscribe({
        next: async (user) => {
          await loading.dismiss();
          this.userService.user = user;
          this.accountRecovered = true;
        },
        error: async (e) => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: e.error.message,
            duration: 5000,
          });
          await toast.present();
        },
      });
    }
  }

  async onClickUpdatePass(form: NgForm) {
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

    await this.updatePassword();
  }

  private async updatePassword() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
    });
    await loading.present();

    this.userService.updatePassword(md5(this.password.psw1)).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Contraseña registrada ✔',
          duration: 5000,
        });
        await toast.present();
        this.router.navigate(['']);
      },
      error: async (e) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: e.error.message,
          duration: 5000,
        });
        await toast.present();
      },
    });
  }
}
