import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrinPage } from './prin.page';

const routes: Routes = [
  {
    path: '',
    component: PrinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrinPageRoutingModule {}
