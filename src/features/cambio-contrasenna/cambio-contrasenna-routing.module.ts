import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CambioContrasennaComponent} from './cambio-contrasenna.component';

const routes: Routes = [
  {
    path: 'cambioContrasenna/:id/:correo',
    component: CambioContrasennaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CambioContrasennaRoutingModule { }
