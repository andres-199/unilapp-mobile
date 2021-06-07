import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginGuard } from 'src/app/guards/login.guard';
import { environment } from 'src/environments/environment';
import { Facultad } from '../facultad.interface';
import { FormPage, TipoPublicacion } from './form/form.page';
import { Publicacion } from './publicacion.interface';
import { ViewPage } from './view/view.page';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  @Input() facultad: Facultad;
  @Input() title = '';
  @Input() publicaciones: Publicacion[];
  env = environment;
  showFullScreen = false;
  private selectedPublicacion: Publicacion = {};
  constructor(
    private modalController: ModalController,
    private loginGuard: LoginGuard
  ) {}

  ngOnInit() {}

  onCLickBackButton() {
    this.modalController.dismiss();
  }

  async onClickAdd() {
    const canActivate = this.loginGuard.canActivate();
    if (!canActivate) return false;
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

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.publicaciones.push(data.data);
      }
    });
  }

  onClickThumbnail(publicacion: Publicacion) {
    this.selectedPublicacion = publicacion;
    setTimeout(() => {
      this.showFullScreen = true;
    });
  }

  get imagenes() {
    return this.selectedPublicacion?.imagenes?.map((imagen) => {
      imagen['image'] = this.env.STORAGE + imagen.path;
      return imagen;
    });
  }

  async onClickPublicacion(publicacion: Publicacion) {
    const canActivate = this.loginGuard.canActivate();
    if (!canActivate) return false;
    const title = this.title.slice(0, -1);
    const modal = await this.modalController.create({
      component: ViewPage,
      componentProps: { publicacion, title },
    });

    await modal.present();
  }
}
