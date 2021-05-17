import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactPageRoutingModule } from './contact-routing.module';
import { ContactPage } from './contact.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ContactPageRoutingModule],
  declarations: [ContactPage],
})
export class ContactPageModule {}
