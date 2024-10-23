/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);

  constructor() {}

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
    this.location.back();
  }
  onPayment() {
    this.router.navigate(['select-slot']);
  }

}
