/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import { SuccessPaymentPage } from '../success-payment/success-payment.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-payments',
  templateUrl: './confirm-payments.page.html',
  styleUrls: ['./confirm-payments.page.scss'],
})
export class ConfirmPaymentsPage implements OnInit {

  constructor(
    public router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onBack() {
   // this.util.onBack();
  }

  async onNext() {
    const modal = await this.modalController.create({
      component: SuccessPaymentPage,
      backdropDismiss: false,
      cssClass: 'success-modal'
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.data && data.role == 'ok') {
        if (data && data.role == 'ok' && data.data == 'home') {
          this.router.navigate(['/tabs']);
        } else if (data && data.role == 'ok' && data.data == 'e-receipt') {
          this.router.navigate(['e-receipt']);
        }
      }
    });
    await modal.present();
  }

}
