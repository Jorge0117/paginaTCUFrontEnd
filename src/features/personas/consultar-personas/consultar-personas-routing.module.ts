import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ConsultarPersonasComponent} from './consultar-personas.component';


const routes: Routes = [
  {
    path: 'personas/:tipo',
    component: ConsultarPersonasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultarPersonasRoutingModule { }
