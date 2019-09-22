import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultarUsuariosComponent} from './consultar-usuarios.component';


const routes: Routes = [
  {
    path: 'usuarios',
    component: ConsultarUsuariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultarUsuariosRoutingModule { }
