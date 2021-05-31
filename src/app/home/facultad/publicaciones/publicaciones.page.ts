import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Facultad } from '../facultad.interface';
import { FormPage, TipoPublicacion } from './form/form.page';
import { Publicacion } from './publicacion.interface';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  @Input() facultad: Facultad;
  @Input() title = '';
  @Input() publicaciones: Publicacion[];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onCLickBackButton() {
    this.modalController.dismiss();
  }

  async onClickAdd() {
    const title = this.title.slice(0, -1);
    const tipoPublicacion = TipoPublicacion[title.toUpperCase()];
    const facultad = this.facultad;

    const modal = await this.modalController.create({
      component: FormPage,
      componentProps: {
        title,
        tipoPublicacion,
        facultad,
      },
    });

    await modal.present();
  }
}
