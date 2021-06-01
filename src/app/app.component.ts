import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#164c8a' });
  }
}
