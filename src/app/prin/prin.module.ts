import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrinPageRoutingModule } from './prin-routing.module';

import { PrinPage } from './prin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrinPageRoutingModule
  ],
  declarations: [PrinPage]
})
export class PrinPageModule {}
