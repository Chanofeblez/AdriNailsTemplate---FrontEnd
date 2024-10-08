import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmappointmentmodalPageRoutingModule } from './confirmappointmentmodal-routing.module';

import { ConfirmAppointmentModalPage } from './confirmappointmentmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmappointmentmodalPageRoutingModule
  ],
  declarations: [ConfirmAppointmentModalPage]
})
export class ConfirmappointmentmodalPageModule {}
