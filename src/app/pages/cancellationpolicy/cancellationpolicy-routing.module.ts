import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancellationpolicyPage } from './cancellationpolicy.page';

const routes: Routes = [
  {
    path: '',
    component: CancellationpolicyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancellationpolicyPageRoutingModule {}
