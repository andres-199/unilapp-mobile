import { Component } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { FormPage } from '../home/facultad/publicaciones/form/form.page';
import { Publicacion } from '../home/facultad/publicaciones/publicacion.interface';
import { PublicacionService } from '../home/facultad/publicaciones/publicacion.service';
import { UserService } from '../login/user.service';
import { Publicaciones } from './publicaciones.interface';

@Component({
  selector: 'app-publications',
  templateUrl: 'publications.page.html',
  styleUrls: ['publications.page.scss'],
})
export class PublicationsPage {
  publicaciones: Publicaciones = {};
  env = environment;
  constructor(
    private userService: UserService,
    private modalController: ModalController,
    private publicacionService: PublicacionService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ionViewDidEnter() {
    this.getPublicaciones();
  }

  private getPublicaciones() {
    this.userService.publicaciones$.subscribe({
      next: (publicaciones) => {
        this.publicaciones = publicaciones;
      },
    });
  }

  async onClickAdd() {
    const modal = await this.modalController.create({
      component: FormPage,
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.getPublicaciones();
      }
    });
  }

  async onClickPublicacion(publicacion: Publicacion) {
    const modal = await this.modalController.create({
      component: FormPage,
      componentProps: { publicacionEdit: publicacion },
    });

    await modal.present();

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.getPublicaciones();
      }
    });
  }

  async onClickDelete(publicacion: Publicacion) {
    const alert = await this.alertController.create({
      header: 'Eliminar Publicación',
      message: `Eliminar ${publicacion.nombre}?`,
      buttons: [
        'Cancelar',

        {
          text: 'Eliminar',
          handler: async () => {
            await this.deletePublicacion(publicacion);
          },
        },
      ],
    });

    await alert.present();
  }

  private async deletePublicacion(publicacion: Publicacion) {
    const loading = await this.loadingController.create({
      message: `Eliminando ${publicacion.nombre}`,
    });
    await loading.present();

    this.publicacionService.deletePublicacion(publicacion).subscribe({
      next: async () => {
        const message = `Se eliminó ${publicacion.nombre}`;
        this.getPublicaciones();
        await loading.dismiss();
        await this.showMessage(message);
      },
    });
  }

  private async showMessage(message: string) {
    const config = {
      message,
      duration: 5000,
    };

    const toast = await this.toastController.create(config);
    toast.present();
  }
}
