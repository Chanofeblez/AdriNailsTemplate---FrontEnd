import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.page.html',
  styleUrls: ['./privacypolicy.page.scss'],
})
export class PrivacypolicyPage implements OnInit {

  navCtrl = inject(NavController);

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
