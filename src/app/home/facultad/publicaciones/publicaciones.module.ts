import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPage } from './publicaciones.page';
import { FormPageModule } from './form/form.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, FormPageModule],
  declarations: [PublicacionesPage],
})
export class PublicacionesPageModule {}
