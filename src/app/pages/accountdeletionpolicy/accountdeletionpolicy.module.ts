import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountdeletionpolicyPageRoutingModule } from './accountdeletionpolicy-routing.module';

import { AccountdeletionpolicyPage } from './accountdeletionpolicy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountdeletionpolicyPageRoutingModule
  ],
  declarations: [AccountdeletionpolicyPage]
})
export class AccountdeletionpolicyPageModule {}
