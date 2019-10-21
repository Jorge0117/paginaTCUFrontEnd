import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ConsultarArticulosComponent} from './consultar-articulos.component';


const routes: Routes = [
  {
    path: 'articulos/:idArea',
    component: ConsultarArticulosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultarArticulosRoutingModule { }
