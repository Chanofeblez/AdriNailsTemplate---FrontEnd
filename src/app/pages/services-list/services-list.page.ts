/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  userId:string;
  selectedDate: string;
  selectedTime: string;

  servicios: Servicio[] = [];
  manicureList: Servicio[] = [];
  pedicureList: Servicio[] = [];

  public servicioService   = inject(ServicioService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(

  ) { }

  ngOnInit() {
    this.loadServicios();

    this.route.queryParams.subscribe(params => {
      this.userId= params['user'];
      this.selectedDate = params['date'];
      this.selectedTime = params['time'];
    });

  }

  loadServicios(): void {
    this.servicioService.getAllServicios().subscribe(
      (data: Servicio[]) => {
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
        user:      this.userId,
        name:      name.name,
        price:     name.price,
        imagePath: name.imagePath,
        date:      this.selectedDate,
        time:      this.selectedTime
      }
    };
    this.router.navigate(['/tabs/service-details'], param);
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
