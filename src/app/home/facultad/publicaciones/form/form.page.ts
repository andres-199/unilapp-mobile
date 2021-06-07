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
import { ImageUploadResponse } from 'src/app/interfaces/image-upload-response';
import { UserService } from 'src/app/login/user.service';
import { LoginGuard } from 'src/app/guards/login.guard';

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
  @Input() publicacionEdit: Publicacion;
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
    private loadingController: LoadingController,
    private userService: UserService,
    private loginGuard: LoginGuard
  ) {}

  ngOnInit() {
    this.validateTipoPublicacion(
      this.tipoPublicacion || this.publicacionEdit?.tipo_publicacion_id
    );
    this.getLists();
    const publicacion = {
      contacto: {},
      imagenes: [],
      tipo_publicacion_id: this.tipoPublicacion,
      facultad_id: this.facultad?.id,
    };

    this.publicacion = publicacion;
  }

  ionViewDidEnter() {
    const canActivate = this.loginGuard.canActivate();

    if (!canActivate) this.modalController.dismiss();

    this.publicacion = this.publicacionEdit || this.publicacion;
  }

  validateTipoPublicacion(tipoPublicacion: TipoPublicacion) {
    if (!tipoPublicacion) return false;
    this.isEmpleo = false;
    this.isServicio = false;
    this.isProducto = false;
    switch (tipoPublicacion) {
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

  async onSubmit(form) {
    if (form.invalid) {
      this.showMessage('Debe completar el formulario.');
      return false;
    }

    if (this.publicacionEdit) await this.updatePublicacion();
    else await this.savePublication();
  }

  private async updatePublicacion() {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
    });
    await loading.present();

    this.publicacionService.updatePublicacion(this.publicacion).subscribe({
      next: async (publicacion) => {
        await loading.dismiss();
        const msg = `${this.title} Actualizado ✔`;
        this.showMessage(msg);
        await this.modalController.dismiss(publicacion);
      },
      error: async (e) => {
        const msg =
          'Error por favor verifique la información e intente nuevamente.';
        this.showMessage(msg);
        await loading.dismiss();
      },
    });
  }

  private async savePublication() {
    const loading = await this.loadingController.create({
      message: 'Publicando...',
    });
    await loading.present();

    const user = this.userService.user;
    this.publicacion.persona_id = user.Persona.id;

    this.publicacionService.savePublication(this.publicacion).subscribe({
      next: async (publicacion) => {
        await loading.dismiss();
        const msg = `${this.title} publicado ✔`;
        this.showMessage(msg);
        await this.modalController.dismiss(publicacion);
      },
      error: async (e) => {
        const msg =
          'Error por favor verifique la información e intente nuevamente.';
        this.showMessage(msg);
        await loading.dismiss();
      },
    });
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

        this.publicacionService.uploadImages(files).subscribe({
          next: async (images) => {
            if (!this.publicacion.imagenes.length) {
              this.publicacion.imagenes = [...images];
            } else {
              this.publicacion.imagenes.push(...images);

              setTimeout(() => {
                this.slides.slideTo(this.publicacion.imagenes.length - 1);
              }, 50);
            }

            await loading.dismiss();
          },
          error: async () => {
            await loading.dismiss();
          },
        });
      }
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
    return this.publicacion?.imagenes?.map((imagen) => {
      imagen['image'] = this.env.STORAGE + imagen.path;
      return imagen;
    });
  }

  onClickDeleteImage(imagen: ImageUploadResponse) {
    const index = this.publicacion.imagenes.indexOf(imagen);
    if (index >= 0) this.publicacion.imagenes.splice(index, 1);
  }
}
