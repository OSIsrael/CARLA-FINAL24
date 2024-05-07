import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendarPagePage } from './agendar-page.page';

const routes: Routes = [
  {
    path: '',
    component: AgendarPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarPagePageRoutingModule {}
