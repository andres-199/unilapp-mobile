import { Component } from '@angular/core';
import { Facultad } from '../interfaces/facultad.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  facultades: Facultad[];
  constructor(private homeservice: HomeService) {}

  ionViewDidEnter() {
    this.getFacultades();
  }

  private getFacultades() {
    this.homeservice.facultades$.subscribe({
      next: (facultades) => {
        console.log(facultades);

        this.facultades = facultades;
      },
    });
  }
}
