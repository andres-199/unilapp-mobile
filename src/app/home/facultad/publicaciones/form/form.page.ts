import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonSlides,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { Estado } from 'src/app/interfaces/estado.interface';
import { Finalidad } from 'src/app/interfaces/finalidad.interface';
import { environment } from 'src/environments/environment';
import { Facultad } from '../../facultad.interface';
import { Publicacion } from '../publicacion.interface';
import { PublicacionService } from '../publicacion.service';
import { TipoPublicacion as TP } from 'src/app/interfaces/tipo-publicacion.interface';

export enum TipoPublicacion {
  EMPLEO = 1,
  PRODUCTO = 2,
  SERVICIO = 3,
}

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  @Input() title = '';
  @Input() tipoPublicacion: TipoPublicacion;
  @Input() facultad: Facultad;
  estados: Estado[] = [];
  finalidades: Finalidad[] = [];
  facultades: Facultad[];
  tipoPublicaciones: TP[];
  isEmpleo = false;
  isServicio = false;
  isProducto = false;

  publicacion: Publicacion;

  selectedImageIndex: number = -1;
  showFullScreen = false;
  env = environment;

  @ViewChild(IonSlides) slides: IonSlides;
  constructor(
    private toastController: ToastController,
    private modalController: ModalController,
    private publicacionService: PublicacionService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    console.log(this.publicacion);

    switch (this.tipoPublicacion) {
      case TipoPublicacion.EMPLEO:
        this.isEmpleo = true;
        break;

      case TipoPublicacion.PRODUCTO:
        this.isProducto = true;
        break;

      case TipoPublicacion.SERVICIO:
        this.isServicio = true;
        break;
    }
    this.getLists();
    this.publicacion = {
      contacto: {},
      imagenes: [],
      tipo_publicacion_id: this.tipoPublicacion,
      facultad_id: this.facultad.id,
    };
  }

  private getLists() {
    this.publicacionService.getFinalidades.subscribe({
      next: (finalidades) => {
        this.finalidades = finalidades;
      },
    });

    this.publicacionService.getestados.subscribe({
      next: (estados) => {
        this.estados = estados;
      },
    });

    this.publicacionService.getFacultades.subscribe({
      next: (facultades) => {
        this.facultades = facultades;
      },
    });

    this.publicacionService.getTipoPublicaciones.subscribe({
      next: (tipoPublicaciones) => {
        this.tipoPublicaciones = tipoPublicaciones;
      },
    });
  }

  onSubmit(form) {
    console.log(form);

    if (form.invalid) {
      this.showMessage('Debe completar el formulario.');
      return false;
    }
  }

  private async showMessage(message: string) {
    const config = {
      message,
      duration: 5000,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
        },
      ],
    };

    const toast = await this.toastController.create(config);
    toast.present();
  }

  onCLickBackButton() {
    this.modalController.dismiss();
  }

  async onLoadPhoto(e) {
    const files = e.target.files;
    let loading: HTMLIonLoadingElement;
    if (files)
      if (files.length > 0) {
        loading = await this.loadingController.create({
          message: 'Cargando imagen...',
        });
        await loading.present();
      }

    this.publicacionService.uploadImages(files).subscribe({
      next: async (images) => {
        if (!this.publicacion.imagenes.length) {
          this.publicacion.imagenes = [...images];
        } else {
          this.publicacion.imagenes.push(...images);

          setTimeout(() => {
            this.slides.slideNext();
          }, 50);
        }

        await loading.dismiss();
      },
      error: async () => {
        await loading.dismiss();
      },
    });
  }

  showFullScreenImage(index: number) {
    this.selectedImageIndex = index;
    this.showFullScreen = true;
  }

  closeEventHandler() {
    this.showFullScreen = false;
    this.selectedImageIndex = -1;
  }

  get imagenes() {
    return this.publicacion.imagenes.map((imagen) => {
      imagen['image'] = this.env.STORAGE + imagen.path;
      return imagen;
    });
  }
}
