/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { Servicio } from 'src/app/model/manicure-service.interface';
import { ServicioService } from 'src/app/services/servicio.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.page.html',
  styleUrls: ['./services-list.page.scss'],
})
export class ServicesListPage implements OnInit {

  segment: any = 'manicure';
  selectedDate: string;
  selectedTime: string;

  servicios: Servicio[] = [];
  manicureList: Servicio[] = [];
  pedicureList: Servicio[] = [];

  public servicioService   = inject(ServicioService);
  private route = inject(ActivatedRoute);
  private util = inject(UtilService);

  constructor(

  ) { }

  ngOnInit() {
    this.loadServicios();

    this.route.queryParams.subscribe(params => {
      this.selectedDate = params['date'];
      this.selectedTime = params['time'];
      console.log('Selected Date:', this.selectedDate);
      console.log('Selected Time:', this.selectedTime);
    });

  }

  loadServicios(): void {
    this.servicioService.getAllServicios().subscribe(
      (data: Servicio[]) => {
        console.log(data);
        this.servicios = data;
        this.separateServicios(this.servicios);
      },
      (error) => {
        console.error('Error al cargar los servicios', error);
      }
    );

  }

  separateServicios(servicios: Servicio[]) {
    for (let i = 0; i < servicios.length; i++) {
      if (servicios[i] && servicios[i].type) {
        if (servicios[i].type === 'MANICURE') {
          this.manicureList.push(servicios[i]);
        } else {
          this.pedicureList.push(servicios[i]);
        }
      }
    }
  }

  onBack() {
    //this.util.onBack();
  }

  onServiceDetails(name: Servicio) {
    const param: NavigationExtras = {
      queryParams: {
        name: name.name,
        price: name.price,
        date: this.selectedDate,
        time: this.selectedTime
      }
    };
    this.util.navigateToPage('service-details', param);
  }

  onPayment() {
   // this.util.navigateToPage('select-slot');
  }

  segmentChanged() {
    console.log(this.segment);
  }

  onReceipt() {
   // this.util.navigateToPage('e-receipt');
  }

}
