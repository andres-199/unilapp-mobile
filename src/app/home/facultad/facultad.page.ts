import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Facultad } from 'src/app/home/facultad/facultad.interface';
import { FacultadService } from './facultad.service';
import { Publicacion } from './publicaciones/publicacion.interface';
import { PublicacionesPage } from './publicaciones/publicaciones.page';
@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.page.html',
  styleUrls: ['./facultad.page.scss'],
})
export class FacultadPage implements OnInit {
  @Input() facultad: Facultad;
  constructor(
    private modalController: ModalController,
    private facultadService: FacultadService
  ) {}

  ngOnInit() {
    this.getFacultad();
  }

  private getFacultad() {
    this.facultadService.getFacultad(this.facultad).subscribe({
      next: (facultad) => {
        this.facultad = facultad;
      },
    });
  }

  onCLickBackButton() {
    this.modalController.dismiss();
  }

  async onClickPublicaciones(publicaciones: Publicacion[], title: string) {
    const modal = await this.modalController.create({
      component: PublicacionesPage,
      componentProps: {
        facultad: this.facultad,
        publicaciones,
        title,
      },
    });

    await modal.present();
  }
}
