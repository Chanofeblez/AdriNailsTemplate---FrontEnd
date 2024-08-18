/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ManicureInterface } from 'src/app/model/manicure-service.interface';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.page.html',
  styleUrls: ['./services-list.page.scss'],
})
export class ServicesListPage implements OnInit {

  segment: any = 'manicure';

  carga: ManicureInterface[];

  public util= inject(UtilService);

  constructor(

  ) { }

  ngOnInit() {
    this.carga = this.util.getManicureList();
  }

  onBack() {
    this.util.onBack();
  }

  onServiceDetails(name: ManicureInterface) {
    const param: NavigationExtras = {
      queryParams: {
        name: name.name
      }
    };
    this.util.navigateToPage('service-details', param);
  }

  onPayment() {
    this.util.navigateToPage('select-slot');
  }

  segmentChanged() {
    console.log(this.segment);
  }

  onReceipt() {
    this.util.navigateToPage('e-receipt');
  }

}
