import { Component, Input, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ModalController } from '@ionic/angular';
import { LoginGuard } from 'src/app/guards/login.guard';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../publicacion.interface';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  providers: [CallNumber],
})
export class ViewPage implements OnInit {
  @Input() publicacion: Publicacion = {};
  @Input() title = '';
  selectedImageIndex: number = -1;
  showFullScreen = false;
  env = environment;
  constructor(
    private modalController: ModalController,
    private callNumber: CallNumber,
    private loginGuard: LoginGuard
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    const canActivate = this.loginGuard.canActivate();
    if (!canActivate) this.modalController.dismiss();
  }

  onCLickBackButton() {
    this.modalController.dismiss();
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
    return this.publicacion.imagenes?.map((imagen) => {
      imagen['image'] = this.env.STORAGE + imagen.path;
      return imagen;
    });
  }

  onClickEmail(email: string) {
    window.open('mailto:' + email);
  }

  onClickCall(number: string) {
    this.callNumber.callNumber(number, true);
  }

  onClickWhatsapp(number: string) {
    window.open('https://api.whatsapp.com/send?phone=+57' + number);
  }

  onClickFacebook(url: string) {
    url = url.includes('http') ? url : 'https://' + url;
    window.open(url);
  }
}
