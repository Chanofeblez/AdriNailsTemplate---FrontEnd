/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManicureInterface } from 'src/app/model/manicure-service.interface';
import { UtilService } from 'src/app/services/util.service';
import { CancelModalPage } from '../cancel-modal/cancel-modal.page';
import { ModalController } from '@ionic/angular';
import { PaymentModalPage } from '../payment-modal/payment-modal.page';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {

  name: String = '';

  carga: ManicureInterface[]=[]
  carga1: ManicureInterface[]=[]
  mostrar : ManicureInterface;
  total: number = 0;

  private modalController = inject(ModalController);

  constructor(
    public util: UtilService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      this.name = data.name;
      console.log(this.name);
      this.carga = util.getManicureList();
      this.carga1 = util.getPedicureList();
    this.mostrar = this.getServicio(this.name);
    console.log(this.name);
    });

  }

  ngOnInit() {
  }

  onBack() {
    this.util.onBack();
  }

  getServicio(name: String) {

    for (let i = 0; i < this.carga.length; i++) {
      if (name === this.carga[i].name) {
        this.mostrar = this.carga[i];
        this.total=this.mostrar.price;
      }
    }
    for (let i = 0; i < this.carga1.length; i++) {
      if (name === this.carga1[i].name) {
        this.mostrar = this.carga1[i];
      }
    }
    console.log(this.mostrar);
    return this.mostrar;
  }

  onCheckboxChange(event: any, item: any) {
    const isChecked = event.detail.checked;
    console.log('Checkbox changed:', isChecked, 'for item:', item);
    if(isChecked){
      this.total+=item.price;
    }else{
      this.total-=item.price;
    }
  }

  onPayment() {
    this.util.navigateToPage('payment-modal');
  }

  async presentModal() {
    const amountToCharge = this.total;
    const modal = await this.modalController.create({
      component: PaymentModalPage,
      cssClass: 'bookmark-modal',
      componentProps: {
        amount: amountToCharge
    }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
      if (data && data.data == 'ok' && data.role == 'ok') {
        this.util.navigateToPage('payment-modal');
      }
    });
    await modal.present();
  }

}
