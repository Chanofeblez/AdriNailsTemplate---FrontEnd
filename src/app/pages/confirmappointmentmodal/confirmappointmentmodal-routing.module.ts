import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmAppointmentModalPage } from './confirmappointmentmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmAppointmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmappointmentmodalPageRoutingModule {}
