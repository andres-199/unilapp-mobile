import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PublicationsPage } from './publications.page';
import { PublicationsPageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PublicationsPageRoutingModule,
  ],
  declarations: [PublicationsPage],
})
export class PublicationsPageModule {}
