import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormArticulosComponent} from './form-articulos.component';
import {AuthGuard} from '../../../shared/seguridad/auth.guard';



const routes: Routes = [
  {
    path: 'articulos/:modo/:id',
    component: FormArticulosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class FormArticulosRoutingModule { }
