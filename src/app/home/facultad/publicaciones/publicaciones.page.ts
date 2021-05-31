import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Publicacion } from './publicacion.interface';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
})
export class PublicacionesPage implements OnInit {
  @Input() facultad = '';
  @Input() title = '';
  @Input() publicaciones: Publicacion[];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onCLickBackButton() {
    this.modalController.dismiss();
  }
}
