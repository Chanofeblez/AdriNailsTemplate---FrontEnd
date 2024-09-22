import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancellationpolicyPageRoutingModule } from './cancellationpolicy-routing.module';

import { CancellationpolicyPage } from './cancellationpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancellationpolicyPageRoutingModule
  ],
  declarations: [CancellationpolicyPage]
})
export class CancellationpolicyPageModule {}
