import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailRecursPage } from './detail-recurs.page';

const routes: Routes = [
  {
    path: '',
    component: DetailRecursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRecursPageRoutingModule {}
