import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-accountdeletionpolicy',
  templateUrl: './accountdeletionpolicy.page.html',
  styleUrls: ['./accountdeletionpolicy.page.scss'],
})
export class AccountdeletionpolicyPage implements OnInit {

  navCtrl = inject(NavController);

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
