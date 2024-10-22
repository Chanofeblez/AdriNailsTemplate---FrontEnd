/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  logged: boolean;

  public util        = inject(UtilService);
  public authService = inject(AuthService);
  private router     = inject(Router);
  private cdRef      = inject(ChangeDetectorRef);

  constructor() { }

  async ngOnInit() {
    // Suscríbete al observable para obtener el valor booleano
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.logged = isLoggedIn; // Asigna el valor del observable a 'logged'
      // Forzar la detección de cambios
      this.cdRef.detectChanges();
    });
  }

  ionViewDidEnter() {
    // Suscríbete al observable para obtener el valor booleano
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.logged = isLoggedIn; // Asigna el valor del observable a 'logged'
      // Forzar la detección de cambios
      this.cdRef.detectChanges();
    });
  }

  onNotification() {
    //this.util.navigateToPage('login');
    console.log("login go");
    this.router.navigate(['/login']);
  }


}
