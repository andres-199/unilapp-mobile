import { Component } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Contact } from './contact.interface';
import { ContactService } from './contact.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss'],
  providers: [CallNumber],
})
export class ContactPage {
  contacts: Contact[];
  constructor(
    private contactService: ContactService,
    private callNumber: CallNumber
  ) {}

  ionViewDidEnter() {
    this.getContacts();
  }

  private getContacts() {
    this.contactService.getContactos.subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        console.log(contacts);
      },
    });
  }

  onClickEmail(email: string) {
    window.open('mailto:' + email);
  }

  onClickCall(number: string) {
    this.callNumber.callNumber(number, true);
  }

  onClickWhatsapp(number: string) {
    window.open('https://api.whatsapp.com/send?phone=' + number);
  }

  onClick(itemSliding: IonItemSliding) {
    itemSliding.open('end');
  }
}
