import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRecursPageRoutingModule } from './detail-recurs-routing.module';

import { DetailRecursPage } from './detail-recurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailRecursPageRoutingModule
  ],
  declarations: [DetailRecursPage]
})
export class DetailRecursPageModule {}
