/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.page.html',
  styleUrls: ['./package-details.page.scss'],
})
export class PackageDetailsPage implements OnInit {
  name: string = '';
  image: string = '';
  description: string = '';
  pdfPath: string = '';
  videoPath: string = '';

  constructor(
    public util: UtilService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data); // Imprime los datos recibidos para asegurarte de que están siendo pasados correctamente.

      // Asigna los valores recibidos desde los parámetros de la ruta
      this.name = data.name;
      this.image = data.image;
      this.description = data.description;
      this.pdfPath = data.pdfPath;
      this.videoPath = data.videoPath;
    });
  }


  onBack() {
    this.util.onBack();
  }
  onPayment() {
    this.util.navigateToPage('select-slot');
  }

}
