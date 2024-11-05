/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Salon Locks & Lashes This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2023-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PackageDetailsPageRoutingModule } from './package-details-routing.module';

import { PackageDetailsPage } from './package-details.page';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PackageDetailsPageRoutingModule,
  ],
  declarations: [
    PackageDetailsPage,
    SafePipe
  ],
  providers: [FileOpener]
})
export class PackageDetailsPageModule { }
