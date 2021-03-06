import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicacionesPage } from './publicaciones.page';
import { FormPageModule } from './form/form.module';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { ViewPageModule } from './view/view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPageModule,
    NgImageFullscreenViewModule,
    ViewPageModule,
  ],
  declarations: [PublicacionesPage],
})
export class PublicacionesPageModule {}
