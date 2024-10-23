/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  mode: any = 'sms';
  currentDiv: any = '1';
  showPassword: boolean = false;

  public router = inject(Router);
  public location = inject(Location);

  constructor() { }

  ngOnInit() {
  }

  changeToggle() {
    this.showPassword = !this.showPassword;
  }

  changeMode(mode: any) {
    this.mode = mode;
  }

  onBack() {
    this.location.back();
  }

  onPin() {
    this.currentDiv = '2';
  }

  onVerify() {
    this.currentDiv = '3';
  }

  onComplete() {
    console.log('complete');
    //this.router.showSimpleAlert('Password Reset');
    this.location.back();
  }

}
