import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {ConsultarAreasDeInteresComponent} from './consultar-areas-de-interes.component';


const routes: Routes = [
  {
    path: 'areasdeinteres',
    component: ConsultarAreasDeInteresComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultarAreasDeInteresRoutingModule { }
