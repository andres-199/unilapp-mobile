import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacultadPage } from './facultad.page';
import { PublicacionesPageModule } from './publicaciones/publicaciones.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PublicacionesPageModule],
  declarations: [FacultadPage],
})
export class FacultadPageModule {}
