import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPage } from './publicaciones.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [PublicacionesPage],
})
export class PublicacionesPageModule {}
