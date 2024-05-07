import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarPagePageRoutingModule } from './agendar-page-routing.module';

import { AgendarPagePage } from './agendar-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendarPagePageRoutingModule
  ],
  declarations: [AgendarPagePage]
})
export class AgendarPagePageModule {}
