import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { FormPage } from '../home/facultad/publicaciones/form/form.page';
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
    private modalController: ModalController
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
}
