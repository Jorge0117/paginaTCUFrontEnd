import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConsultarUsuariosComponent} from './consultar-usuarios.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';


const routes: Routes = [
  {
    path: 'usuarios',
    component: ConsultarUsuariosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ConsultarUsuariosRoutingModule { }
