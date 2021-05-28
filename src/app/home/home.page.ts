import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Facultad } from './facultad/facultad.interface';
import { FacultadPage } from './facultad/facultad.page';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  facultades: Facultad[];
  constructor(
    private homeservice: HomeService,
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.getFacultades();
  }

  private getFacultades() {
    this.homeservice.facultades$.subscribe({
      next: (facultades) => {
        this.facultades = facultades;
      },
    });
  }

  async onClickFacultad(facultad: Facultad) {
    const modal = await this.modalController.create({
      component: FacultadPage,
      componentProps: { facultad },
    });

    await modal.present();
  }
}
