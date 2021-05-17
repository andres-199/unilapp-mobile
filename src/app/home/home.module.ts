import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ToolbarModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
