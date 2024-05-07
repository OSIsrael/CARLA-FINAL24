import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InsesPageRoutingModule } from './inses-routing.module';

import { InsesPage } from './inses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsesPageRoutingModule,
  ],
  declarations: [InsesPage]
})
export class InsesPageModule {}
