import { Component, inject, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cancellationpolicy',
  templateUrl: './cancellationpolicy.page.html',
  styleUrls: ['./cancellationpolicy.page.scss'],
})
export class CancellationpolicyPage implements OnInit {

  navCtrl = inject(NavController);

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

}
