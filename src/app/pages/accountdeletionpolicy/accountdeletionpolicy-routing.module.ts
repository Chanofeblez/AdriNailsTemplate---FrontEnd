import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountdeletionpolicyPage } from './accountdeletionpolicy.page';

const routes: Routes = [
  {
    path: '',
    component: AccountdeletionpolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountdeletionpolicyPageRoutingModule {}
