import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsesPage } from './inses.page';

const routes: Routes = [
  {
    path: '',
    component: InsesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsesPageRoutingModule {}
