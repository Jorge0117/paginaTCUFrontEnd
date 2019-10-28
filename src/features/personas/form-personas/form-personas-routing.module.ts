import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';
import {FormPersonasComponent} from './form-personas.component';



const routes: Routes = [
  {
    path: 'personas/:tipo/:modo/:correo',
    component: FormPersonasComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FormPersonasRoutingModule { }
